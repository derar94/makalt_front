exports.signIn = async function(credentials) {
    await window.axios.get('/sanctum/csrf-cookie')
    return await window.axios.post('/login', credentials)
}

exports.signOut = async function() {
    return await window.axios.post('/logout')
}
exports.getProfile = async function() {
    return await window.axios.get('/api/profile')
}