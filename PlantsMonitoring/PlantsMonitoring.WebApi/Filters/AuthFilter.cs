using PlantsMonitoring.Common;
using PlantsMonitoring.UsersService;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace PlantsMonitoring.WebApi.Filters
{
    public class AuthFilter : IAuthenticationFilter
    {
        private IUsersService usersService;

        public AuthFilter(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        public bool AllowMultiple => true;

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            if (SkipAuthorization(context.ActionContext))
            {
                return;
            }

            var authorization = context.Request.Headers.Authorization;

            if (authorization == null)
            {
                context.ErrorResult = new AuthenticationFailureResult(context.Request);
                return;
            }

            if (authorization.Scheme != Constants.AUTH_SCHEME)
            {
                context.ErrorResult = new AuthenticationFailureResult(context.Request);
                return;
            }

            var token = authorization.Parameter;
            if (string.IsNullOrEmpty(token))
            {
                context.ErrorResult = new AuthenticationFailureResult(context.Request);
                return;
            }

            var isValid = await this.usersService.ValidateToken(token);
            if (isValid)
            {
                var userIdClaim = this.GetUserIdClaimFromToken(token);
                var identity = new ClaimsIdentity(new List<Claim>() { userIdClaim });
                context.Principal = new ClaimsPrincipal(identity);
            }
            else
            {
                context.ErrorResult = new AuthenticationFailureResult(context.Request);
                return;
            }
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            var challenge = new AuthenticationHeaderValue(Constants.AUTH_SCHEME);
            context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);
            return Task.FromResult(0);
        }

        private static bool SkipAuthorization(HttpActionContext actionContext)
        {
            return actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any()
                       || actionContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any();
        }

        private Claim GetUserIdClaimFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenValue = tokenHandler.ReadToken(token) as JwtSecurityToken;
            var userIdClaim = tokenValue.Claims.SingleOrDefault(c => c.Type == Constants.USER_ID_CLAIM);

            return userIdClaim;
        }
    }
}
