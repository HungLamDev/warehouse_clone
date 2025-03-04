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

export const createConfog = (signal:any) => {
    return {
        ...defaultConfig,
        signal: signal
    }
}