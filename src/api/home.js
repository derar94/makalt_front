exports.getHomeContent = async function() {
    return await window.axios.get('api/articles')
}