
    var BjsApp = BjsApp || {};

    BjsApp.init = () => {

            const canvas = document.getElementById('renderCanvas');

            const engine = new BABYLON.Engine(canvas , true);

            const scene = new BABYLON.Scene(engine);   

            //camera

            const camera = new BABYLON.ArcRotateCamera('camera', 0,0,15, BABYLON.Vector3(0,0,0), scene);
            camera.upperRadiusLimit = 1000;
            //sobre mover a camera
            camera.attachControl(canvas);

            //light

            const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

            light.groundColor = new BABYLON.Color3(0,0,0);
            light.intensity = 0.9;
            scene.clearColor = new BABYLON.Color3(0,0,0);
            
            //sun
            const sun = BABYLON.Mesh.CreateSphere('sun', 20,4,scene);
            const sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
            sunMaterial.emissiveTexture =new BABYLON.Texture('images/sun.jpg', scene);
            sun.material = sunMaterial;
            sunMaterial.specularColor = new BABYLON.Color3(0,0,0);
            sunMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
            sunMaterial.uScale = 50;
            sunMaterial.vScale = 30;
            //sunLight
            const sunLight = new BABYLON.PointLight('sunlight', BABYLON.Vector3.Zero(),scene);
            sunLight.intensity = 2;

            //skybox

            const skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
            const skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat', scene);
            skyboxMaterial.backFaceCulling = false;


            //move with camera 
            skybox.infiniteDistance = true;
            skybox.material =skyboxMaterial;


            //remove reflection in skybox
            skyboxMaterial.specularColor = new BABYLON.Color3(0,0,0);
            skyboxMaterial.diffuseColor= new BABYLON.Color3(0,0,0);

            //skybox texture 6 fotos do cubo
            
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('images/skybox',scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

            const planetMaterial = new BABYLON.StandardMaterial('planetMaterial', scene);

            planetMaterial.diffuseTexture = new BABYLON.Texture('images/sand.jpg',scene);

            planetMaterial.specularColor =   new BABYLON.Color3(0,0,0);  

            const planet1 = BABYLON.Mesh.CreateSphere('planet1', 18,0.4,scene);

            planet1.position.x= 5;            
            planet1.material = planetMaterial;

            planet1.orbit = {
                radius:planet1.position.x,
                speed:-0.01,
                angle:1
            };
            //planet 2 
            const planetMaterial2 = new BABYLON.StandardMaterial('planetMaterial', scene);

            planetMaterial2.diffuseTexture = new BABYLON.Texture('images/venus.jpg',scene);

            planetMaterial2.specularColor =   new BABYLON.Color3(0,0,0);  
            const planet2 = BABYLON.Mesh.CreateSphere('planet1', 20,0.75,scene);

            planet2.position.x= 5;
            
            planet2.material = planetMaterial2;

            //planet 3 
            const planetMaterial3 = new BABYLON.StandardMaterial('planetMaterial', scene);

            planetMaterial3.diffuseTexture = new BABYLON.Texture('images/terra.jpg',scene);

            planetMaterial3.specularColor =   new BABYLON.Color3(0,0,0);  
            const planet3 = BABYLON.Mesh.CreateSphere('planet1', 20,0.9,scene);
            planet3.rotation.x= -3;
            planet3.position.x= 6;
            planet3.material = planetMaterial3;
            
             //planet 4 
            const planetMaterial4 = new BABYLON.StandardMaterial('planetMaterial', scene);

            planetMaterial4.diffuseTexture = new BABYLON.Texture('images/marte.jpg',scene);

            planetMaterial4.specularColor =   new BABYLON.Color4(0,0,0);  
            const planet4 = BABYLON.Mesh.CreateSphere('planet1', 20,0.7,scene);
            planet4.material = planetMaterial4;
            planet4.position.x= 7;
    

            scene.beforeRender= () =>{
                planet1.position.x = planet1.orbit.radius * Math.sin(planet1.orbit.angle);
                planet1.position.z = planet1.orbit.radius * Math.sin(planet1.orbit.angle);
                planet1.orbit.angle += planet1.orbit.speed;
            }


            engine.runRenderLoop( function(){
               
              //  planet1.position = new BABYLON.Vector3(50 * Math.sin(alpha), planet1.parent.position.y, 50 * Math.cos(alpha));
                planet1.rotation.y += .012;
                planet2.rotation.y += .013;
                planet3.rotation.y += .019;
                planet4.rotation.y += .01;  
               // planet2.position = new BABYLON.Vector3(100 * Math.sin(alpha2+2), planet2.parent.position.y, 100 * Math.cos(alpha2+2));
                
        
                scene.render();
                


            window.addEventListener('resize', function(){
                engine.resize();
            });  
        });
    }