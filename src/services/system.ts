
export function fetchSystemInformation () {
    return fetch('/api/hello').then(res => res.json());
}