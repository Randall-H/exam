# README - Exam Requirements #

### Technology Stack ###

* Node         - server
* LocalStorage - client storage
* React        - client main framework
* Manifest     - client support
* jQuery       - client support (inside materialize.min.js)
* Materialize  - client support (inside materialize.min.js)
* Node Packages of NOTE - react-scroll + react-transition-group outdated
* 'UNMET PEER DEPENDENCY' for react & react-dom v16.0.0. on both packages. This is due to recent changes in later
* versions of react-scroll and react-transition-group

### Defaults & Assumptions ###

* localhost is located @ http://localhost:8080. To change, go to "<root_dir>/var/port.js" and change the port.

### Initialization ###

* npm install
* npm run start      => start up local environment server
* npm run dev_watch  => start up local environment webpack (outputs @ dir "/public", uses app.html )
* npm run prod_build => compile production ready package (outputs @ dir "/src", uses prodapp.html )

### Production Env ###
## Performance: Loadtime_[to-be-tested], DOMContentedLoaded_[to-be-tested] ##

### Staging Env ###
## Performance: Loadtime_[to-be-tested], DOMContentedLoaded_[to-be-tested] ##

### Local Env ###
## Performance: Loadtime_[870ms-1.81s], DOMContentedLoaded_[863ms-1.32s] ##


### Architecture ###

* The app enters at init.js. From there localstorage is checked and default data is stored as the App's beginning data.
* You will find all the frontend functionality inside the '/app' dir and the server functionality inside the
* '/server' dir.