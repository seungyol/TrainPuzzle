export default class TrainRoute {
    constructor(fromStation, toStation, distance) {
        this.fromStation = fromStation;
        this.toStation = toStation;
        this.distance = distance;
    }
    toString() {
        return this.fromStation + this.toStation + this.distance;
    }
   /**
    * Get the last destination station for the route.
    * For eg, with the parameter 'CD8DE6EB3BC4CE2', this returns the second last character 'E'.
    **/
    static getToStation(routeStr) {
        let len = 0, toStation = "";
        len = routeStr !== null ? routeStr.length : 0;
        
        if(len < 3){
            return "";
        }
        
        toStation = routeStr.substring(len - 2, len - 1);
        return toStation;
    }

    /**
    * Get a total distance of the path string
    **/
    static getDistanceOfRoute(routeStr) {
        let distance = 0;
        
        if(routeStr !== null) {
            let routeStrLen = routeStr.length;
            
            if( routeStrLen >= 3) {
                for(let i=2; i < routeStrLen; i = i + 3) {
                    distance += parseInt(routeStr.substring(i, i + 1), 10);
                }
            }
        }
        
        return distance;
    }

    /**
    * Find the No of paths which do not exceed the limit distance
    **/
    static findNoOfPathsWithLimitDistance(models, fromSt, toSt, limitDistance) {
        let routes = [], tmpRoutes = [], noOfPaths = 0, tmpRoutesEndPos = 0;

        this.findRoutesWithFromSt(models, fromSt).forEach((route)=> {
            tmpRoutes.push(route.toString()); 
        });

        while(tmpRoutes.length > 0) {
            routes = tmpRoutes;
            tmpRoutes = [];

            for(let i in routes) {
                let toStation = this.getToStation(routes[i]);
                let result = this.findRoutesWithFromSt(models, toStation);
                if(result.length > 0) {
                    for(let tmp of result) {
                        tmpRoutes.push(routes[i] + tmp.toString());
                    }
                }
            }
            
            tmpRoutesEndPos = tmpRoutes.length-1;
            for(let i= tmpRoutesEndPos; i >= 0; i--) {
                let toStation = this.getToStation(tmpRoutes[i]);
                let len = this.getDistanceOfRoute(tmpRoutes[i]);

                if(len >= limitDistance) {
                    tmpRoutes.splice(i,1);
                } else {
                    if(toStation === toSt) {
                        noOfPaths++;
                    }           
                }            
            }        
        }

        return noOfPaths;
    }

    /**
    * Find the shortest distance of the path
    **/
    static findShortestLength(models, fromSt, toSt) {
        let routes = [], tmpRoutes = [], shortestLength = 0, tmpRoutesEndPos = 0;

        this.findRoutesWithFromSt(models, fromSt).forEach((route)=> {
            tmpRoutes.push(route.toString()); 
        });

        while(tmpRoutes.length > 0) {
            routes = tmpRoutes;
            tmpRoutes = [];

            for(let i in routes) {
                let routesFromSt = this.findRoutesWithFromSt(models, this.getToStation(routes[i]));
                if(routesFromSt.length > 0) {
                    for(let tmp of routesFromSt) {
                        tmpRoutes.push(routes[i] + tmp.toString());
                    }
                }
            }
            
            tmpRoutesEndPos = tmpRoutes.length-1;
            for(let i= tmpRoutesEndPos; i >= 0; i--) {
                if(tmpRoutes[i] !== undefined){
                    if(this.getToStation(tmpRoutes[i]) === toSt) {
                        let len = this.getDistanceOfRoute(tmpRoutes[i]);

                        if(shortestLength === 0) {
                            shortestLength = len;
                        }else if(shortestLength > len) {
                            shortestLength = len;
                        }
                        tmpRoutes.splice(i,1);
                    } else {
                        
                        let tmpLen = tmpRoutes[i].length;
                        if(tmpLen >= 9) {
                            for(let j = 0; j <= tmpLen - 3; j = j + 3) {
                                let regExp = new RegExp(tmpRoutes[i].substring(j,j+3), 'g');
                                if((tmpRoutes[i].match(regExp) || []).length > 1) {
                                    tmpRoutes.splice(i,1);
                                    break;
                                }
                            }
                        }                    
                    }
                
                }
            }        
        }
        return shortestLength;
    }


    /**
    * Find the distance of the routes
    **/
    static findDistanceOfRoute(models,routes) {
        let distance = 0, len = 0, lenModels = models.length;
        
        len = routes.length-1;
        for(let idx=0; idx < len;idx++) {
            let found = false;
            for(let i = 0; i < lenModels; i++){
                if(models[i].fromStation === routes[idx] && 
                    models[i].toStation === routes[idx+1]) {
                    distance += parseInt(models[i].distance,10);
                    found = true;
                }
            }
            if(found === false) {
                return 'NO SUCH ROUTE';
            }
        }
        
        return distance;
    }

    /**
    * Find the No of trips which has the exact stop no
    **/
    static findTripNoWithExactStopNo(models, fromSt, toSt, stopNo) {
        var noTrips = 0;
        var routes = [];
        for(let i=0; i< stopNo; i++) {
            if(i === 0) {
                routes = this.findRoutesWithFromSt(models, fromSt);
            }else {
                let tmpRoutes = [];
                for(let route of routes) {
                    tmpRoutes = tmpRoutes.concat(this.findRoutesWithFromSt(models, route.toStation));
                }

                routes = tmpRoutes;
            }
        }

        for(let route of routes){
            if(route.toStation === toSt) {
                noTrips++;
            }
        }    
        return noTrips;
    }

    /**
    * Find the No of trips which do not exceed the maximum stops
    **/
    static findTripNoWithMaxStop(models, fromSt, toSt, maxStop) {
        let noTrips = 0, routes = [];
        
        for(let i=0; i < maxStop; i++) {
            if(i === 0) {
                routes = this.findRoutesWithFromSt(models, fromSt);
            } else {
                let tmpRoutes = [];
                
                for(let route of routes) {
                    tmpRoutes = tmpRoutes.concat(this.findRoutesWithFromSt(models, route.toStation));
                }
                
                routes = [];
                for(let route of tmpRoutes){
                    if(route.toStation === toSt) {
                        noTrips++;
                    } else {
                        routes.push(route);
                    }
                }
            }
        }

        return noTrips;
    }

    /**
    * Find the routes which starts from the parameter fromSt
    **/
    static findRoutesWithFromSt(models, fromSt) {
        let results = [], lenModels = models.length;
        
        for(let i = 0; i < lenModels; i++){
            if(models[i].fromStation === fromSt) {
                results.push(models[i]);
            }
        }
        
        return results;
    }    
}
