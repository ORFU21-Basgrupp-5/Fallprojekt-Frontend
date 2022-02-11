export const render = (root) => {
    root.innerHTML = '';
    root.innerHTML = stringReg;
    const text = document.createTextNode('Reg');
    root.appendChild(text);
}

const stringReg = '<div id="reg"><h1>Skapa ett konto</h1><p>Har du redan ett konto? <a href="/">Logga in här</a></p><form id="reg_form"><div id="hidden-message"></div><div id="uname"><label for="username">Användarnamn </label><input type="text" name="username" placeholder="Välj ett användarnamn"></div><div id="email"><label for="email">Email: </label><input type="text" name="email" placeholder="Fyll i din epost"></div><div id="pswrd"><label for="password">Lösenord: </label><input type="text" name="password" placeholder="Välj ett lösenord"></div><div id="pswrdvalid"><label for="password2">Bekräfta lösenord: </label><input type="text" name="password2" placeholder="Bekräfta lösenord"></div><div id="btn"><input type="submit"></div></form></div>'