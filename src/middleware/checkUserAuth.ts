const checkUserAuth = resolverFunc => async (parent, args, context, info) => {
    if (!context.req.user) {
        return {
            ok: false,
            error: "No authentication user."
        }
    }

    const resolved = await resolverFunc(parent, args, context, info)

    return resolved
}

export default checkUserAuth
