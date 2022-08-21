import axios from '../plugins/axios'

export function loadStorage(name = 'appIds') {
    return axios.post('api/getUserCollectionList', {
        key: name
    }).then(res => {
        const data = res.data.data
        if (data.length > 0) {
            console.log()
            const value = JSON.parse(data[0].collectionValue)
            return value
        } else {
            return []
        }
    })
}
export function saveStorage(appIds, name = 'appIds') {
    return axios.post('api/addUserCollection', {
        collectionKey: name,
        collectionValue: JSON.stringify(appIds)
    })
}
