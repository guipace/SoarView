# SoarView

<p align="center">
    <img src="https://user-images.githubusercontent.com/63423828/113918339-eb6c2d80-97a7-11eb-999c-63a2e039b0ea.gif" alt="SoarView" />
</p>

## Description
[SoarView](https://soarview.herokuapp.com) is a full-stack web application for glider pilots to upload, review and share flights they've recorded on a GPS. It is inspired on [OLC](www.onlinecontest.org). For more information on the world of soaring visit [The Soaring Society of America](www.ssa.org).

## Links
* [Live Application](https://soarview.herokuapp.com)
* [Application Wiki](https://github.com/guipace/SoarView/wiki)

## Primary Languages
* JavaScript
* Python
* HTML5
* CSS3
* SQL

## Technologies Implemented
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node.js](https://nodejs.org/)
* [OpenLayers](https://openlayers.org/)
* [Chart.js](https://www.chartjs.org/)
* [WTForms](https://wtforms.readthedocs.io/en/2.3.x/)
* [Flask](https://palletsprojects.com/p/flask/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Alembic](https://alembic.sqlalchemy.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Amazon Web Services S3](https://aws.amazon.com/s3/)
* [Docker](https://www.docker.com/)
* [FontAwesome](https://fontawesome.com/)
* [TailwindCSS](https://tailwindcss.com)
* [Heroku](https://heroku.com/)

## Developing
Below are instructions to run the application on a local development environment.

### Pre-installed requirements:
* Python v3.8
* PostgreSQL
* Pipenv
* Node.js

### Instructions:
1. Clone this repository
    ```bash
    git clone https://github.com/guipace/SoarView.git
    ```

2. Change directory
    ```bash
    cd SoarView
    ```

3. Create python environment & install dependencies
    ```bash
    pipenv install -r --dev dev-requirements.txt && pipenv install -r requirements.txt
    ```

4. Create your own environment variables files (`.env`) based on the provided examples (`.env.example`) in the project's root directory and react-app directory.

5. Create a user and database in your PostgreSQL that matches your environment variables configuration.

6. In a terminal activate the Pipenv environment
    ```bash
    pipenv shell
    ```

7. Apply migrations to the database
    ```bash
    flask db upgrade
    ```

8. Seed the database
    ```bash
    flask seed all
    ```

9. In another terminal, change directories into the react-app directory
    ```bash
    cd react-app
    ```

10. Install node modules
    ```bash
    npm install
    ```

11. Run backend application in first terminal
    ```bash
    flask run
    ```

12. Run the frontend application in second terminal
    ```bash
    npm start
    ```

13. The application should open in your default browser.

## Challenges
Some of the challenges faced in the development of SoarView include the following:
* Understanding and parsing niche .IGC GPS files that are only used by soaring pilots. Researched and implemented little-known parsing library capable of handling IGC files. Manipulated parsed output into a format digestible by OpenLayers mapping and Chart.js charting libraries.
* Rendering of recorded GPS tracks on a map proved challenging. GPS track objects can contain upwards of ten thousand GPS fixes that need to be fed into the OpenLayers map. Implementing a solution that would render quickly took considerable effort and review of OpenLayers and React documentation.

## Code Highlight
* Implementation of OpenLayers map with GPS track rendering and Charts.js graph for altitude profile

    ```javascript
    function MapWrapper({ features, igcParsedData }) {
        const [ map, setMap ] = useState();
        const [ featuresLayer, setFeaturesLayer ] = useState();
        const [ selectedCoord, setSelectedCoord ] = useState();
        const mapElement = useRef();

        // Create state ref that can be accessed in OpenLayers onclick callback function
        const mapRef = useRef()
        mapRef.current = map

        // Initialize map on first render
        useEffect(() => {

            // Create and add vector source layer
            const initialFeaturesLayer = new VectorLayer({
            source: new VectorSource(),
            style: polygonStyle
            })

            // Create map
            const initialMap = new Map({
            target: mapElement.current,
            layers: [
                // Bing Maps Satelite
                new TileLayer({
                source: new BingMaps({
                    key: bingApiKey,
                    imagerySet: 'AerialWithLabelsOnDemand',
                }),
                title: 'Satelite',
                type: 'base',
                }),
                // Bing Maps Roads
                new TileLayer({
                source: new BingMaps({
                    key: bingApiKey,
                    imagerySet: 'RoadOnDemand',
                }),
                title: 'Standard',
                type: 'base',
                }),
                // Bing Maps Dark
                new TileLayer({
                source: new BingMaps({
                    key: bingApiKey,
                    imagerySet: 'CanvasDark',
                }),
                title: 'Dark',
                type: 'base',
                }),

                initialFeaturesLayer,
            ],
            view: new View({
                projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 2
            }),
            controls: defaults(),
            });

            const layerSwitcher = new LayerSwitcher({
            reverse: true,
            groupSelectStyle: 'group'
            });
            initialMap.addControl(layerSwitcher);

            // Save map and vector layer references to state
            setMap(initialMap);
            setFeaturesLayer(initialFeaturesLayer);

            initialMap.on('click', handleMapClick)
        }, []);


        // Update map if features prop changes
        useEffect(() => {

            if (features.length) {// May be empty on first render

            // Set features to map
            featuresLayer.setSource(
                new VectorSource({
                features: features // Make sure features is an array
                })
            );

            // Fit map to feature extent (with 50px of padding)
            map.getView().fit(featuresLayer.getSource().getExtent(), {
                padding: [50, 50, 50, 50]
            });
            }
        }, [features, featuresLayer, map]);


        // Map click handler
        const handleMapClick = (event) => {

            // Get clicked coordinate using mapRef to access current React state inside OpenLayers callback
            const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

            // Transform coord to EPSG 4326 standard Lat Long
            const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

            // Set React state
            setSelectedCoord( transormedCoord )
        }

        // Graph options
        const options = {
            maintainAspectRatio: false,
            scales: {
            yAxes: [
                {
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 6,
                },
                },
            ],
            xAxes: [
                {
                ticks: {
                    beginAtZero: false,
                    maxRotation: 0,
                    maxTicksLimit: 10,
                },
                type: 'time',
                    time: {
                    displayFormats: {
                        minute: 'H:mm'
                    },
                    },
                },
            ],
            },
            legend: {
            display: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
            },
            title: {
            display: true,
            text: 'Flight height profile',
            }
        }

        // Graph data
        let data;
        if (igcParsedData) {
            data = {
            // labels: igcParsedData.fixes.map(el => el.timestamp),
            datasets: [
                {
                label: 'Height',
                data: igcParsedData.fixes.map(el => {
                    let obj = {
                    y:el.gpsAltitude,
                    x:new Date(el.timestamp)
                    }
                    return obj
                }),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(236, 70, 70, 1)',
                borderWidth: 3,
                pointRadius: 0,
                },
            ],
            }
        }

        return (
            <div className='bg-background w-full h-full md:w-9/12 md:order-2'>
            <div className='map-container w-full h-5/6' ref={mapElement}></div>
            <div className='w-full px-2'>
                <Line className='' height={120} data={data} options={options} />
            </div>
            </div>
        )
    }
    ```
