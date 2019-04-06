const IS_EQUAL_PRO = true

const JUDGE_WAY = (env, isEqualPro) => {
	return isEqualPro ? env == 'production' : env != 'production';
}

const GETAPI_ROOT = (env, isEqualPro) => {
    if (JUDGE_WAY(env, isEqualPro)) {
        const origin = location.origin || (location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : ''))
        const pathname = (location.pathname + '/').replace('//', '/')
        return origin + pathname
    } else {
        return 'http://port:8000/';
    }
}

export const API_ROOT = GETAPI_ROOT(process.env.NODE_ENV, IS_EQUAL_PRO)

export const IS_DEBUG = (process.env.NODE_ENV !== 'production')
