# README - Exam Requirements #

### Technology Stack ###

* Node         - server
* LocalStorage - client storage
* React        - client main framework
* jQuery       - client support
* Materialize  - client support
* Node Packages of NOTE - react-scroll + react-transition-group outdated
* 'UNMET PEER DEPENDENCY' for react & react-dom v16.0.0. on both packages. This is due to recent changes in later
* versions of react-scroll and react-transition-group

### Defaults & Assumptions ###

* localhost is located @ http://localhost:8080. To change, go to "<root_dir>/var/port.js" and change the port.

### Initialization ###

* npm install
* npm run start      => start up local environment server
* npm run dev_watch  => start up local environment webpack (outputs @ dir "/public" )
* npm run prod_build => compile production ready package (outputs @ dir "/src" )

### Production Env ###
## Performance: Loadtime_[to-be-tested], DOMContentedLoaded_[to-be-tested] ##

### Staging Env ###
## Performance: Loadtime_[to-be-tested], DOMContentedLoaded_[to-be-tested] ##

### Local Env ###
## Performance: Loadtime_[1.07s-773ms], DOMContentedLoaded_[675ms-688ms] ##
