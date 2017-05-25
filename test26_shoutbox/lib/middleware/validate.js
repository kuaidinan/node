exports.required = function(field){
  return function(req,res,next){
    if(req.body[field]){
      next();
    } else {
      res.error(field + '必填');
      res.redirect('back');
    }
  }
};

exports.lengthAbove = function(field,len){
  return function(req,res,next){
    console.log(req.body);
    if(req.body[field].length>len){
      next();
    } else {
      res.error(field + '最少超过'+ len +'位');
      res.redirect('back');
      }
  }
}