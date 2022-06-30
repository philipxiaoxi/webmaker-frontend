export function loadStorage(name = 'appIds') {
    const str = localStorage.getItem(name)
    return str ? JSON.parse(str) : []
}
export function saveStorage(appIds, name = 'appIds') {
    localStorage.setItem(name, JSON.stringify(appIds))
}
