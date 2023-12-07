function validarRut(input) {
    let regex = /^[0-9]{1,2}(\.|)[0-9]{3}(\.|)[0-9]{3}(-|)[0-9kK]{1}$/;
    return regex.test(input);
}

module.exports={
    validarRut
}