export const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
const defaultConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const createConfig = (signal:any) => {
    return {
        ...defaultConfig,
        signal: signal
    }
}