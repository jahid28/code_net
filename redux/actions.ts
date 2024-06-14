export const getEmailActionFunc = (email:string) => {
    return {
        type: 'getEmailAction',
        payload: email
    }
}
export const clearEmailActionFunc = () => {
    return {
        type: 'clearEmailAction',
        // payload: email
    }
}
export const getCurrentUserDetailsActionFunc = () => {
    return {
        type: 'getCurrentUserDetailsAction',
        // payload: email
    }
}
export const storeAllPostsActionFunc = (redisPostList:string[]) => {
    return {
        type: 'storeAllPostsAction',
        payload: redisPostList
    }
}
export const pushFollowingToArrFunc = (userName:string) => {
    return {
        type: 'pushFollowingToArrAction',
        payload: userName
    }
}
export const popFollowingToArrFunc = (userName:string) => {
    return {
        type: 'popFollowingToArrAction',
        payload: userName
    }
}
export const dec = () => {
    return {
        type: 'decActiontype',
        data: 18
    }
}