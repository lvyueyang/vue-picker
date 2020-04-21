export default {
    objectDeepCopy(obj) {
        try {
            return JSON.parse(JSON.stringify(obj))
        } catch (e) {
            return obj
        }
    }
}
