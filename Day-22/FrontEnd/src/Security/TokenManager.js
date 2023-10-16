import Cookies from 'js-cookie';

export const setToken = (token) => {
    Cookies.set('token', token, { expires: 7});
};


export const getToken = (token) => {
    
    return Cookies.get('token');
};

export const setUser = (user) => {
   localStorage.setItem('user',user)
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    Cookies.remove('token');
    localStorage.removeItem('role');

};  
 
export const getAuthorizationHeaders = () => { 
    return {
      headers: {
        'Authorization': `Bearer ${getToken('token')}`
        
      }
    };
  };

 
  



