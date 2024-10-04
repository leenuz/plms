$(document).on("click",".editBtn",function() {
  const urlParams = new URL(location.href).searchParams;
  const idx = urlParams.get('idx');
  url = "/land/jisang/usePermitEdit?idx=" +idx;
     window.location = url;
});
