$(document).on("click",".editBtn",function() {
  const urlParams = new URL(location.href).searchParams;
  const idx = urlParams.get('idx');
  url = "/jisang/usePermitEdit?idx=" +idx;
     window.location = url;
});
