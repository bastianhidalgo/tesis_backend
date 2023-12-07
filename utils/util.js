function useRegexNombre(input) {
    let regex = /^[a-zA-Z]+$/;
    return regex.test(input);
}
function useRegexTelefono(input) {
    let regex = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;
    return regex.test(input);
}
function useRegexRut(input) {
    let regex = /^[0-9]{1,2}(\.|)[0-9]{3}(\.|)[0-9]{3}(-|)[0-9kK]{1}$/;
    return regex.test(input);
}
module.exports={
    useRegexNombre,
    useRegexTelefono,
    useRegexRut
}