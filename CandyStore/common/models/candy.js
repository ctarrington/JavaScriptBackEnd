module.exports = function(Candy) {
  Candy.afterRemote("find", function(context, model, next) {
    context.result = { "candies": context.result };
    next();
  });

  Candy.afterRemote("findById", function(context, model, next) {
    context.result = { "candy": context.result };
    next();
  });

  Candy.afterRemote("create", function(context, model, next) {
    context.result = { "candy": context.result };
    next();
  });

  Candy.observe("before save", function (ctx, next) {
    if (ctx.instance) {
      ctx.instance.setAttribute("name", ctx.instance.candy.name);
      ctx.instance.setAttribute("size", ctx.instance.candy.size);
      ctx.instance.unsetAttribute("candy");
    }

    next();
  });
};
