export default function loading(state = false, action) {
    const { type } = action;
    const matches = /(.*)_REQUEST/.exec(type);
   
    if (!matches) return false;  

    return true;
  };
  