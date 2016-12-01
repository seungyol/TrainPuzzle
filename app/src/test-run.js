import TrainRoute from 'src/train-route';
export default class TestRunner {
    
    //Test 1: The distance of the route A-B-C
    getTest1Result(models) {
        return TrainRoute.findDistanceOfRoute(models,['A','B','C']);
    }
    //Test 2: The distance of the route A-D
    getTest2Result(models) {
        return TrainRoute.findDistanceOfRoute(models,['A','D']);
    }
    //Test 3: The distance of the route A-D-C
    getTest3Result(models) {
        return TrainRoute.findDistanceOfRoute(models,['A','D','C']);
    }
    //Test 4: The distance of the route A-E-B-C-D
    getTest4Result(models) {
        return TrainRoute.findDistanceOfRoute(models,['A','E','B','C','D']);
    }
    //Test 5: The distance of the route A-E-D
    getTest5Result(models) {
        return TrainRoute.findDistanceOfRoute(models,['A','E','D']);
    }
    //Test 6: The number of trips starting at C and ending at C with a maximum of 3 stops
    getTest6Result(models) {
        return TrainRoute.findTripNoWithMaxStop(models,'C','C',3);
    }
    //Test 7: The number of trips starting at C and ending at C with a maximum of 3 stops
    getTest7Result(models) {
        return TrainRoute.findTripNoWithExactStopNo(models,'A','C',4);
    }
    //Test 8: The length of the shortest route (in terms of distance to travel) from A to C
    getTest8Result(models) {
        return TrainRoute.findShortestLength(models,'A','C');
    }
    //Test 9: The length of the shortest route (in terms of distance to travel) from B to B
    getTest9Result(models) {
        return TrainRoute.findShortestLength(models,'B','B');    
    }
    //Test 10: The number of different routes from C to C with a distance of less than 30
    getTest10Result(models) {
        return TrainRoute.findNoOfPathsWithLimitDistance(models,'C','C', 30);    
    }
}
