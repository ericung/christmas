
const BOUNDARY = 5;
const HEIGHT = 6;
const SNOWCOUNT = 500;

var stats, scene, renderer, composer;
var camera, cameraControl;

var snow = new Array(SNOWCOUNT);

if( !init() )	animate();

// init the scene
function init(){

    if( Detector.webgl ){
        renderer = new THREE.WebGLRenderer({
            antialias		: true,	// to get smoother output
            preserveDrawingBuffer	: true	// to allow screenshot
        });
        renderer.setClearColor(0x111111, 2 );
    }else{
        renderer	= new THREE.CanvasRenderer();
    }
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // add Stats.js - https://github.com/mrdoob/stats.js
    stats = new Stats();
    stats.domElement.style.position	= 'absolute';
    stats.domElement.style.bottom	= '0px';
    document.body.appendChild( stats.domElement );

    // create a scene
    scene = new THREE.Scene();

    // put a camera in the scene
    camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 5);
    scene.add(camera);

    // create a camera contol
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );

    // transparently support window resize
    THREEx.WindowResize.bind(renderer, camera);
    // allow 'p' to make screenshot
    THREEx.Screenshot.bindKey(renderer);
    // allow 'f' to go fullscreen where this feature is supported
    if( THREEx.FullScreen.available() ){
        THREEx.FullScreen.bindKey();		
        document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
    }

    // ============================================================================================
    // Lights
    var light	= new THREE.DirectionalLight( 0xffffff );
    light.position.set( .25, .25, .25 ).normalize();
    scene.add( light );
    var light	= new THREE.PointLight( 0.5 * 0xffffff );
    light.position.set( 0.5, 0.5, 0.5 )
                .normalize().multiplyScalar(1.2);
    scene.add( light );
    var light	= new THREE.PointLight( 0.25* 0xffffff );
    light.position.set( 0.2, 0.2, 0.2 )
                .normalize().multiplyScalar(1.2);
    scene.add( light );

    // ============================================================================================

    // Tree
    var material0 = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
    var loader = new THREE.JSONLoader();
    loader.load( "models/christmastreetop.js", function( geometry ){
        var mesh    = new THREE.Mesh( geometry, material0 );
        mesh.scale.set(0.2, 0.2, 0.2);
        mesh.position.set(0, 0, 0);
        scene.add( mesh );
    });

    var materialr = new THREE.MeshPhongMaterial( {color: 0x691F01} );
    var loader = new THREE.JSONLoader();
    loader.load( "models/christmastreeroot.js", function( geometry ){
        var mesh    = new THREE.Mesh( geometry, materialr );
        mesh.scale.set(0.2, 0.2, 0.2);
        mesh.position.set(0, 0, 0);
        scene.add( mesh );
    });

    // Floor
    //var material1 = new THREE.MeshPhongMaterial( {color: 0x5E2605} );
    var material1 = new THREE.MeshPhongMaterial( {color: 0xffffff} );
    var loader = new THREE.JSONLoader();
    loader.load( "models/disk.js", function( geometry ){
        var mesh = new THREE.Mesh( geometry, material1 );
        mesh.scale.set(0.5, 0.5, 0.5);
        mesh.position.set(0,-1.05,0);
        scene.add( mesh );
    });

    // ============================================================================================

    // scatter some red presents
    var size = 0.25; 
    var material2 = [
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present01.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present01.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present02.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present01.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present01.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present01.png' )
                        })
    ];

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(1,-0.9,0);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(-0.575,-0.9,-.20);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(-0.475,-0.9,-1.05);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(0.475,-0.9,-1.05);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(-0.575,-0.9,1.05);
    scene.add(cube);

    // ============================================================================================

    // scatter some blue presents
    var material2 = [
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present03.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present03.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present04.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present03.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present03.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present03.png' )
                        })
    ];

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(0.7,-0.9,-0.25);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(-.3,-0.9,.8);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(0.1,-0.9,-.8);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(-1,-0.9,-.1);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(0.75,-0.9,0.75);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material2) );
    cube.position.set(-0.5,-0.6495,.9);
    scene.add(cube);

    // ============================================================================================

    // scatter some green presents
    var material3 = [
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present06.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        })
    ];

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material3) );
    cube.position.set(0.575,-0.9,-.75);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material3) );
    cube.position.set(-0.575,-0.9,.75);
    scene.add(cube);

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material3) );
    cube.position.set(-0.9,-0.9,.45);
    scene.add(cube);
    
    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material3) );
    cube.position.set(0.5,-0.6495,-.9);
    scene.add(cube);

    // ============================================================================================

    // scatter some green presents
    var size = 0.15;
    var material4 = [
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present06.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/alexei.png' )
                        }),
                    new THREE.MeshLambertMaterial({
                        ambient: 0xffffff,
                        map: THREE.ImageUtils.loadTexture( 'images/present05.png' )
                        })
    ];

    var cube = new THREE.Mesh(  new THREE.CubeGeometry(size, size, size, 3, 3, 3), 
                                new THREE.MeshFaceMaterial(material4) );
    cube.position.set(0.75,-0.7,.8);
    scene.add(cube);
    // ============================================================================================

    // create a particle system
    var materials = new THREE.MeshBasicMaterial({
                            color: 0xffffff,
                            transparent: true,
                            opacity: 0.75
        });
    var half = BOUNDARY/2;

    for (var i=0; i<SNOWCOUNT; i++){
        snow[i] = new THREE.Mesh(   new THREE.SphereGeometry(0.005),
                                    materials);
        snow[i].position.set(  Math.random()*BOUNDARY - half, 
                            Math.random()*HEIGHT - 1.02,
                            Math.random()*BOUNDARY - half);
        snow[i].velocity = new THREE.Vector3(
                                    0,
                                    -Math.random,
                                    0);
        snow[i].life = Math.random()*30;

        scene.add(snow[i]);
    }
}

// animation loop
function animate() {

    // loop on request animation loop
    // - it has to be at the begining of the function
    // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    requestAnimationFrame( animate );

    // update snow position
    for (var i=0; i < SNOWCOUNT; i++){
        if (snow[i].position.y <= -1.02){
            if (snow[i].life > 0){
                snow[i].life--;
                snow[i].velocity = new THREE.Vector3(0,0,0);
            } else {
                var half = BOUNDARY/2;
                snow[i].position.set(  Math.random()*BOUNDARY - half, 
                Math.random()*HEIGHT - 1.02,
                Math.random()*BOUNDARY - half);

                snow[i].life = Math.random()*30;
            }
        } else {
            snow[i].position.add(snow[i].velocity);
            snow[i].velocity.add(new THREE.Vector3(0,-Math.random()*0.000003,0));
        }
    }

    // do the render
    render();

    // update stats
    stats.update();
}

// render the scene
function render() {
    // variable which is increase by Math.PI every seconds - usefull for animation
    var PIseconds	= Date.now() * Math.PI;

    // update camera controls
    cameraControls.update();


    // actually render the scene
    renderer.render( scene, camera );
}
