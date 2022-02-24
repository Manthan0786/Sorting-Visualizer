export function mergesort(array) {
  const animation = [];
  if (array.length <= 1) {
    return array;
  }
  mergesortHelper(array, 0, array.length - 1, animation);
  return animation;
}

function mergesortHelper(array, startindex, endindex, animation) {
  if (startindex >= endindex) {
    return;
  }
  const mid = Math.floor((startindex + endindex) / 2);
  mergesortHelper(array, startindex, mid, animation);
  mergesortHelper(array, mid + 1, endindex, animation);
  merge(array, startindex, mid, endindex, animation);
}

function merge(array, startindex, mid, endindex, animation) {
  let l = startindex;
  let k = startindex;
  let r = mid + 1;
  let mainArray = [];
  while (l <= mid && r <= endindex) {
    animation.push([l, r]);
    animation.push([l, r]);
    if (array[l] <= array[r]) {
      animation.push([k, array[l]]);
      mainArray[k] = array[l];
      k++;
      l++;
    } else {
      animation.push([k, array[r]]);
      mainArray[k] = array[r];
      k++;
      r++;
    }
  }
  while (l <= mid) {
    animation.push([l, l]);
    animation.push([l, l]);
    animation.push([k, array[l]]);
    mainArray[k] = array[l];
    k++;
    l++;
  }
  while (r <= endindex) {
    animation.push([r, r]);
    animation.push([r, r]);
    animation.push([k, array[r]]);
    mainArray[k] = array[r];
    k++;
    r++;
  }

  for (var i = startindex; i <= endindex; i++) {
    array[i] = mainArray[i];
  }
}
