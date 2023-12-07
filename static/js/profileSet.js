var hobbyMaxCount = 5;
var traitMaxCount = 5;
var hobbyCount = 0;
var traitCount = 0;

function hobbyChecked(event) {
  if(event.checked) {
    hobbyCount += 1;
  }
  else {
    hobbyCount -=1;
  }

  if (hobbyCount > hobbyMaxCount) {
    alert ("최대 5개까지만 선택 가능합니다.");
    event.checked = false;
    hobbyCount -= 1;
  }
}

function traitChecked(event) {
  if(event.checked) {
    traitCount += 1;
  }
  else {
    traitCount -=1;
  }

  if (traitCount > traitMaxCount) {
    alert ("최대 5개까지만 선택 가능합니다.");
    event.checked = false;
    traitCount -= 1;
  }
}

function fristDone(event) {
  event.preventDefault();
  let fristDiv = document.getElementById('frist');
  let secondDiv = document.getElementById('second');

  let selectedElement = document.getElementById('alone');
  if (selectedElement && selectedElement.checked) {
      let thridDiv = document.getElementById('thrid');
      fristDiv.style.display = 'none';
      thridDiv.style.display = 'block';
  } else {
      fristDiv.style.display = 'none';
      secondDiv.style.display = 'block';
  }
}
                function secondDone(event) {
                    event.preventDefault();
                    let secondDiv = document.getElementById('second');
                    let thridDiv = document.getElementById('thrid');
                    secondDiv.style.display = 'none';
                    thridDiv.style.display = 'block';
                    
                }
                function thridDone(event) {
                    event.preventDefault();
                    let thridDiv = document.getElementById('thrid');
                    let fourDiv = document.getElementById('four');
                    thridDiv.style.display = 'none';
                    fourDiv.style.display = 'block';
                }
                function fourDone(event) {
                    event.preventDefault();
                    let fourDiv = document.getElementById('four');
                    let fiveDiv = document.getElementById('five');
                    fourDiv.style.display = 'none';
                    fiveDiv.style.display = 'block';
                }
                function fiveDone(event) {
                  event.preventDefault();
                  let fiveDiv = document.getElementById('five');
                  let sixthDiv = document.getElementById('sixth');
                  fiveDiv.style.display = 'none';
                  sixthDiv.style.display = 'block';
              }
              function sixthDone(event) {
                event.preventDefault();
                let sixthDiv = document.getElementById('sixth');
                let sevenDiv = document.getElementById('seven');
                sixthDiv.style.display = 'none';
                sevenDiv.style.display = 'block';
            }

function clicker(event) {
  btn.addEventListener('click', () => {
    bar.style.width = count + '%';
    
    if(count ===100) {
      count = 0;
    }
    else {
      count = count + 8.9;
    }
  });
}


const checkboxGroup = document.getElementById('imageBody');
const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
          checkboxes.forEach(cb => {
              if (cb !== checkbox) {
                  cb.checked = false;
              }
          });
      }
  });
});

function toggleCheckbox(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  checkbox.checked = !checkbox.checked;

  if (checkbox.checked) {
      checkboxes.forEach(cb => {
          if (cb !== checkbox) {
              cb.checked = false;
          }
      });
  }
}


function mbtiCheckbox(checkboxId1, checkboxId2) {
  let lastChecked = null;

  function handleCheckboxClick(checkbox, otherCheckbox) {
    if (checkbox !== lastChecked) {
      otherCheckbox.checked = false;
      lastChecked = checkbox;
    }
  }

  const checkbox1 = document.getElementById(checkboxId1);
  const checkbox2 = document.getElementById(checkboxId2);

  checkbox1.addEventListener('click', function() {
    handleCheckboxClick(checkbox1, checkbox2);
  });

  checkbox2.addEventListener('click', function() {
    handleCheckboxClick(checkbox2, checkbox1);
  });
}

function threeCheckbox(checkboxId1, checkboxId2, checkboxId3) {
  let lastChecked2 = null;

  function handleCheckboxClick(checkbox, otherCheckbox1, otherCheckbox2) {
    if (checkbox !== lastChecked2) {
      otherCheckbox1.checked = false;
      otherCheckbox2.checked = false;
      lastChecked2 = checkbox;
    }
  }

  const checkbox1 = document.getElementById(checkboxId1);
  const checkbox2 = document.getElementById(checkboxId2);
  const checkbox3 = document.getElementById(checkboxId3);

  checkbox1.addEventListener('click', function() {
    handleCheckboxClick(checkbox1, checkbox2, checkbox3);
  });

  checkbox2.addEventListener('click', function() {
    handleCheckboxClick(checkbox2, checkbox1, checkbox3);
  });

  checkbox3.addEventListener('click', function() {
    handleCheckboxClick(checkbox3, checkbox1, checkbox2);
  });
}





