const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const allImages = importAll(
  require.context("./", false, /\.(png|jpe?g|svg)$/)
);


const vid = () => {

  var imgs = []
  var i = 1
  Object.values(allImages).forEach(val  => {
    imgs.push(
      {
        url: val,
        title: `Title ${i}`,
        id: i
      }
    )
    i++
  });
  
return(imgs)
}


export default vid;
