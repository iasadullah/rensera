const resolve = async (promise) => {
    let resolved;

    try {
        resolved = await promise;

    } catch (e) {
       
        resolved = e;
        throw new Error(e)
    }

    return resolved;
}
export default resolve