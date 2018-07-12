const privateResolver = resolverFunction => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("No JWT. I refuse to proceed");
  }
  const resolve = await resolverFunction(parent, args, context, info);
  return resolve;
};

export default privateResolver;
