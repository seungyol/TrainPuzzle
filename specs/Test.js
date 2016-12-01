System.import('../app/src/train-route.js').then(function(m) {

    var models = [new m.default('A','B',5),
              new m.default('B','C',4),
              new m.default('C','D',8),
              new m.default('D','C',8),
              new m.default('D','E',6),
              new m.default('A','D',5),
              new m.default('C','E',2),
              new m.default('E','B',3),
              new m.default('A','E',7),
    ];
    
    QUnit.test( "Test1", function( assert ) {
        assert.ok( 9 === m.default.findDistanceOfRoute(models,['A','B','C']), "Test1 Passed!");
    });
    
    QUnit.test( "Test2", function( assert ) {
        assert.ok( 5 === m.default.findDistanceOfRoute(models,['A','D']), "Test2 Passed!");
    });    

    QUnit.test( "Test3", function( assert ) {
        assert.ok( 13 === m.default.findDistanceOfRoute(models,['A','D','C']), "Test3 Passed!");
    });    

    QUnit.test( "Test4", function( assert ) {
        assert.ok( 22 === m.default.findDistanceOfRoute(models,['A','E','B','C','D']), "Test4 Passed!");
    });    

    QUnit.test( "Test5", function( assert ) {
        assert.ok( 'NO SUCH ROUTE' === m.default.findDistanceOfRoute(models,['A','E','D']), "Test5 Passed!");
    });   

    QUnit.test( "Test6", function( assert ) {
        assert.ok( 2 === m.default.findTripNoWithMaxStop(models,'C','C',3), "Test6 Passed!");
    });

    QUnit.test( "Test7", function( assert ) {
        assert.ok( 3 === m.default.findTripNoWithExactStopNo(models,'A','C',4), "Test7 Passed!");
    });      

    QUnit.test( "Test8", function( assert ) {
        assert.ok( 9 === m.default.findShortestLength(models,'A','C'), "Test8 Passed!");
    });      

    QUnit.test( "Test9", function( assert ) {
        assert.ok( 9 === m.default.findShortestLength(models,'B','B'), "Test9 Passed!");
    });      

    QUnit.test( "Test10", function( assert ) {
        assert.ok( 7 === m.default.findNoOfPathsWithLimitDistance(models,'C','C', 30), "Test10 Passed!");
    });      

});