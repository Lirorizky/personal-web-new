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
      <div class="card shadow rounded-4 mt-5" style="width: 20rem">
              <a
                href="/project/1"
                class="text-decoration-none text-dark"
              >
                <img
                  src="${projects[i].projectImage}"
                  class="card-img-top rounded-top"
                  alt="..."
                />
              </a>
              <div class="card-body">
                <a
                  href="/project/1"
                  class="text-decoration-none text-dark"
                >
                  <h5 class="card-title fs-6 fw-semibold">
                    ${projects[i].projectName}
                  </h5>
                  <div class="project-card-duration">
                    <p>${projectDurationTime(projects[i].projectStartDate, projects[i].projectEndDate)}</p>
                  </div>
                  <p class="card-text">
                    ${projects[i].projectDescription}
                  </p>
                  <div class="project-card-tech">
                    ${projects[i].showIcon}
                  </div>
                </a>
                {{#if isLogin}}
                <div
                  class="project-card-actions d-flex mt-3 justify-content-betwee"
                >
                  <a
                    href="#"
                    class="btn btn-block btn-outline-secondary mt-2 rounded-5 w-100 me-1 fw-semibold"
                    >Edit</a
                  >
                  <a
                    href="#"
                    class="btn btn-block btn-danger mt-2 rounded-5 w-100 ms-1 fw-semibold"
                    >Delete</a
                  >
                </div>
                {{/if}}
              </div>
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
  return `<div class="card shadow rounded-4 mt-5" style="width: 20rem">
              <a
                href="./project-detail.html" class="detail-link"
                class="text-decoration-none text-dark"
              >
                <img
                  src="./assets/images/holding_phone.jpg"
                  class="card-img-top rounded-top"
                  alt="..."
                />
              </a>
              <div class="card-body">
                <a
                  href="./project-detail.html"
                  class="text-decoration-none text-dark"
                >
                  <h5 class="card-title fs-6 fw-semibold">
                    Dumbways Mobile App - 2022
                  </h5>
                  <div class="project-card-duration">
                    <p>Duration : 3 Months</p>
                  </div>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <div class="project-card-tech">
                    <img
                      class="pe-1"
                      src="../public/assets/icons/playstore-color.png"
                      alt=""
                    />
                    <img
                      class="pe-1"
                      src="../public/assets/icons/android-color.png"
                      alt=""
                    />
                    <img
                      class="ps-1"
                      src="../public/assets/icons/javacolor.png"
                      alt=""
                    />
                  </div>
                </a>
                {{#if isLogin}}
                <div
                  class="project-card-actions d-flex mt-3 justify-content-betwee"
                >
                  <a
                    href="#"
                    class="btn btn-block btn-outline-secondary mt-2 rounded-5 w-100 me-1 fw-semibold"
                    >Edit</a
                  >
                  <a
                    href="#"
                    class="btn btn-block btn-danger mt-2 rounded-5 w-100 ms-1 fw-semibold"
                    >Delete</a
                  >
                </div>
                {{/if}}
              </div>
            </div>`
}