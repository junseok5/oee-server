const checkAdminAuth = resolverFunc => async (parent, args, context, info) => {
    if (!context.req.session.logged) {
        return {
            ok: false,
            error: "No admin authentication."
        }
    }

    const resolved = await resolverFunc(parent, args, context, info)

    return resolved
}

export default checkAdminAuth
