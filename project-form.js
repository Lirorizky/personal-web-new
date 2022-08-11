let projects = [];

function addProject(event){
  event.preventDefault();

  let projectName = document.getElementById('project-name').value;
  let projectStartDate = document.getElementById('project-start-date').value;
  let projectEndDate = document.getElementById('project-end-date').value;
  let projectDescription = document.getElementById('project-description').value;
  let nodeJs = document.getElementById('nodejs');
  let reactJs = document.getElementById('reactjs');
  let nextJs = document.getElementById('nextjs');
  let typescript = document.getElementById('typescript');
  let projectImage = document.getElementById('project-upload-image'); 

  let showIcon = '';

  showIcon += (nodeJs.checked == true) ? '<img value="nodejs" id="nodejs" src="./assets/icons/node-color.png" alt="">' : '';
  showIcon += (reactJs.checked == true) ? '<img value="reactjs" id="reactjs" src="./assets/icons/react-color.png" alt="">' : '';
  showIcon += (nextJs.checked == true) ? '<img value="nextjs" id="nextjs" src="./assets/icons/next.png" alt="">' : '';
  showIcon += (typescript.checked == true) ? '<img value="typescript" id="typescript" src="./assets/icons/typescript-color.png" alt="">' : '';
  
  projectImage = URL.createObjectURL(projectImage.files[0]);
  projectEndDate = new Date(projectEndDate);
  projectStartDate = new Date(projectStartDate);

  let projectDetails = {
    projectImage,
    projectName,
    projectDescription,
    projectStartDate,
    projectEndDate,
    showIcon
  }

  projects.push(projectDetails);

  displayProject();
}

function displayProject() {

  let projectContainer = document.getElementById('project-showcase');

  projectContainer.innerHTML = firstProjectDisplay();

  let lengthProjects = projects.length;

  for(i = 0; i < lengthProjects; i++){
    projectContainer.innerHTML += `
    <div class="project-card">
          <a href="./project-detail.html" class="detail-link">
            <div class="project-card-info">
              <div class="project-card-img">
                <img src="${projects[i].projectImage}" />
              </div>
              <div class="project-card-header">
                <p>${projects[i].projectName}</p>
              </div>
              <div class="project-card-duration">
                <p>${projectDurationTime(projects[i].projectStartDate, projects[i].projectEndDate)}</p>
              </div>
              <div class="project-card-desc">
                <p>
                  ${projects[i].projectDescription}
                </p>
              </div>
              <div class="project-card-tech">
                ${projects[i].showIcon}
              </div>
            </div>
            <div class="project-card-actions">
              <a href="#" class="edit-btn">
                <button type="button">edit</button>
              </a>
              <a href="#" class="delete-btn">
                <button type="button">delete</button>
              </a>
            </div>
          </a>
      </div>`
  }
  alert('Your project has been successfully updated.');
}

function projectDurationTime(a, b){
  let projectStartAt = new Date(a);
  let projectEndAt = new Date(b);

  let duration = projectEndAt - projectStartAt;

  //day duration
  
  let yearDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 30 * 12));

  if(yearDuration > 0){
    return `Duration: ${yearDuration} years`;
  } else {
    let monthDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 30));

    if (monthDuration > 0) {
      return `Duration: ${monthDuration} months`;
    } else {
      let weeksDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 7));

      if(weeksDuration > 0) {
        return `Duration: ${weeksDuration} weeks`;
      } else {
        let dayDuration = Math.floor(duration / (1000 * 60 * 60 * 24));

        if(dayDuration > 0) {
          return `Duration: ${dayDuration} days`;
        }
      }
    }
  }
}

function firstProjectDisplay() {
  return `<div class="project-card">
          <a href="./project-detail.html" class="detail-link">
            <div class="project-card-info">
              <div class="project-card-img">
                <img src="./assets/images/holding_phone.jpg" />
              </div>
              <div class="project-card-header">
                <p>Dumbways Mobile App - 2022</p>
              </div>
              <div class="project-card-duration">
                <p>Duration : 3 Months</p>
              </div>
              <div class="project-card-desc">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat corporis magni suscipit libero exercitationem!
                  Aperiam
                </p>
              </div>
              <div class="project-card-tech">
                <img src="./assets/icons/playstore-color.png" alt="" />
                <img src="./assets/icons/android-color.png" alt="" />
                <img src="./assets/icons/javacolor.png" alt="" />
              </div>
            </div>
            <div class="project-card-actions">
              <a href="#" class="edit-btn">
                <button type="button">edit</button>
              </a>
              <a href="#" class="delete-btn">
                <button type="button">delete</button>
              </a>
            </div>
          </a>
    </div>`
}