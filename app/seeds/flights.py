from app.models import db, Flight


def seed_flights():

    flight1 = Flight(
        id=1,
        user_id=1,
        igc_url='https://soarview.s3.amazonaws.com/DemoFile.igc',
        date="2021-02-28",
        pilot='Rich Owen',
        copilot='',
        glider_model="ASG 29/18m",
        glider_class='18-meter',
        callsign='ZO',
        registration="N291AU",
        notes='TAT today. Start A, Frostproof, Streamsong, Flanders, Cub Haven, Grass Roots, Finish, Right at 300km flight with a 3 hour minimum time. Task speed from start to finish was 104.28kph. Lead/follow flight with GB. Had a great time, good practice using geometry and cloud streets to pick the correct lines. Marking the trailer parking for the Seniors tomorrow so no flying.'
    )
    db.session.add(flight1)

    flight2 = Flight(
        id=2,
        user_id=3,
        igc_url='https://soarview.s3.amazonaws.com/seeder_ken_sorenson_1.igc',
        date="2021-03-11",
        pilot='Ken Sorenson',
        copilot='',
        glider_model="Ventus2/15m",
        glider_class='15-meter',
        callsign='KM',
        registration="N318KM",
        notes='Pre-Seniors Sailplane Grand Prix, last day. A8 and RF cleaned my clock today. Nice soaring day with plenty of wrinkles. Variable conditions, some smoke. I kept shifting gears. Problem was the A8 & RF never shifted out of hyperdrive.'
    )
    db.session.add(flight2)

    flight3 = Flight(
        id=3,
        user_id=3,
        igc_url='https://soarview.s3.amazonaws.com/seeder_ken_sorenson_2.igc',
        date="2021-03-09",
        pilot='Ken Sorenson',
        copilot='',
        glider_model="Ventus2/15m",
        glider_class='15-meter',
        callsign='KM',
        registration="N318KM",
        notes='Pre-Seniors Sailplane Grand Prix race plus OLC excursions before and after. Great soaring today - 6000 ft and several 6+kt climbs.'
    )
    db.session.add(flight3)

    flight4 = Flight(
        id=4,
        user_id=3,
        igc_url='https://soarview.s3.amazonaws.com/seeder_ken_sorenson_3.igc',
        date="2021-02-03",
        pilot='Ken Sorenson',
        copilot='',
        glider_model="ArcusT",
        glider_class='Open',
        callsign='ARC',
        registration="N740AR",
        notes='Fun flight. Weather was terrific (for Feb) with 4300 cloudbase eventually and some very nice streets. Only glitch was 20 kt wind. Decided to go for a 3 hr OLC 3 TP TAT flight. Got greedy at the end, stayed out a little too late and had to divert to an airport when 15 miles from home but out of range and questionable sky ahead. Have decided that the Arcus will not go into a field and don\'t yet completely trust the sustainer (never will) so am committed to airport diversions if possible. Started the engine over the airport when I couldn\'t find a climb. Would have been a great XC training day but didn\'t have an interested 2nd seater, so can only blame myself for the "landout". Darn.'
    )
    db.session.add(flight4)

    flight5 = Flight(
        id=5,
        user_id=3,
        igc_url='https://soarview.s3.amazonaws.com/seeder_ken_sorenson_4.igc',
        date="2021-02-01",
        pilot='Ken Sorenson',
        copilot='',
        glider_model="ArcusT",
        glider_class='Open',
        callsign='ARC',
        registration="N740AR",
        notes="Nice day. Blue. A little windy but not too bad. Almost ready to venture further from home in these weak conditions with this beast. Was able to reach 3500 agl a few times but it didn't feel very reliable."
    )
    db.session.add(flight5)

    flight6 = Flight(
        id=6,
        user_id=3,
        igc_url='https://soarview.s3.amazonaws.com/seeder_ken_sorenson_5.igc',
        date="2021-01-08",
        pilot='Ken Sorenson',
        copilot='Jim Jackson',
        glider_model="ArcusT",
        glider_class='Open',
        callsign='ARC',
        registration="N740AR",
        notes="Very nice flight with Jim Jackson. Towed into a dead looking sky which was almost solid 3000 ft overcast hoping that the optimistic version of the weather forecast was correct, and it was. The sky slowly opened up into nice cumulus with some streeting. Jim and I coached each other and finally landed because our feet were cold (in Houston!). A great day."
    )
    db.session.add(flight6)

    flight7 = Flight(
        id=7,
        user_id=4,
        igc_url='https://soarview.s3.amazonaws.com/seeder_david_martin_1.igc',
        date="2021-03-13",
        pilot='David Martin',
        copilot='',
        glider_model="ASG29E",
        glider_class='18-meter',
        callsign='BV',
        registration="N512BV",
        notes="SCOH task day 2 HR MAT with 4 close in turns and then wherever. Turned out to be much better than it looked. High cirrus but suprisingly good lift and streets. Very windy 20+ but did manage to add additional turn points.. Clag came in from the south and shut everything down and was lucky to get the 2 HR."
    )
    db.session.add(flight7)

    flight8 = Flight(
        id=8,
        user_id=4,
        igc_url='https://soarview.s3.amazonaws.com/seeder_david_martin_2.igc',
        date="2021-03-08",
        pilot='David Martin',
        copilot='',
        glider_model="ASG29E",
        glider_class='18-meter',
        callsign='BV',
        registration="N512BV",
        notes="SCOH task day, 2 HR TAT PK Ranch, Anderson, Fairweather all with15 Mile circle and then North Lake and True Blue with small circles. Band of cirrus moving in from SW made it interesting. Once past cirrus with sun on the ground good climbs and clouds. Blue back toward home and the close in turn points."
    )
    db.session.add(flight8)

    flight9 = Flight(
        id=9,
        user_id=4,
        igc_url='https://soarview.s3.amazonaws.com/seeder_david_martin_3.igc',
        date="2021-03-06",
        pilot='David Martin',
        copilot='',
        glider_model="ASG29E",
        glider_class='18-meter',
        callsign='BV',
        registration="N512BV",
        notes="SCOH task day. 2 HR TAT, Bellville, Anderson, Fairweather, Bonner with 20 mile circle at Bellville and then decending from there. Turned out to be an excllent day expcially for early March. Nice Clouds and strong thermals and to go with that some very strong sink. A controlled forest burn to the north sent some smoke over the north turns making poor vis. Clear nav showed 68 MPH."
    )
    db.session.add(flight9)

    flight10 = Flight(
        id=10,
        user_id=4,
        igc_url='https://soarview.s3.amazonaws.com/seeder_david_martin_4.igc',
        date="2020-11-12",
        pilot='David Martin',
        copilot='',
        glider_model="ASG29E",
        glider_class='18-meter',
        callsign='BV',
        registration="N512BV",
        notes="SCOH task day 2 HR TAT with four turns to the north and south. Excellent day for mid November with 5,000 bases and nice streets. Deep in the first turn nicked the south turn and then deep again in the north turn to take advantage of the streets and finally nicked the final turn for final glide."
    )
    db.session.add(flight10)

    flight11 = Flight(
        id=11,
        user_id=4,
        igc_url='https://soarview.s3.amazonaws.com/seeder_david_martin_5.igc',
        date="2020-10-21",
        pilot='David Martin',
        copilot='',
        glider_model="ASG29E",
        glider_class='18-meter',
        callsign='BV',
        registration="N512BV",
        notes="SCOH task day 2 hr TAT, bellville 18 mile, Ivey 12 Mile, Somerville 28 mile. The day started with low bases with a start at 3,500. about every third could worked to Bellville and then back to Ivey. It got better that way and good climbs to almost 4,000. After Ivey found a beautiful street that ran to College Station and back that really helped the speed."
    )
    db.session.add(flight11)

    flight12 = Flight(
        id=12,
        user_id=5,
        igc_url='https://soarview.s3.amazonaws.com/seeder_tony_smolder_1.igc',
        date="2021-03-07",
        pilot='Tony Smolder',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='TS1',
        registration="N318TS",
        notes="SCOH Task Day. Severe Blue with some wicked sink lines but also some nice smooth thermals to 5K. Not fast but most fun!"
    )
    db.session.add(flight12)

    flight13 = Flight(
        id=13,
        user_id=5,
        igc_url='https://soarview.s3.amazonaws.com/seeder_tony_smolder_2.igc',
        date="2021-03-06",
        pilot='Tony Smolder',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='TS1',
        registration="N318TS",
        notes="Really, really good day for early March with some nice convergence lines and 6K bases. SCOH Task Day"
    )
    db.session.add(flight13)

    flight14 = Flight(
        id=14,
        user_id=5,
        igc_url='https://soarview.s3.amazonaws.com/seeder_tony_smolder_3.igc',
        date="2021-01-09",
        pilot='Tony Smolder',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='TS1',
        registration="N318TS",
        notes="SCOH Task Day. 1st of 2021. Dump Task with 1.5 hr min. Added 071 as the final turn. Hey it's January and we are soaring!"
    )
    db.session.add(flight14)

    flight15 = Flight(
        id=15,
        user_id=5,
        igc_url='https://soarview.s3.amazonaws.com/seeder_tony_smolder_4.igc',
        date="2020-11-21",
        pilot='Tony Smolder',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='TS1',
        registration="N318TS",
        notes="SCOH Task Day. WOW - great soaring day for November!"
    )
    db.session.add(flight15)

    flight16 = Flight(
        id=16,
        user_id=5,
        igc_url='https://soarview.s3.amazonaws.com/seeder_tony_smolder_5.igc',
        date="2020-11-07",
        pilot='Tony Smolder',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='TS1',
        registration="N318TS",
        notes='Great day for November'
    )
    db.session.add(flight16)

    flight17 = Flight(
        id=17,
        user_id=6,
        igc_url='https://soarview.s3.amazonaws.com/seeder_glenn_yeldezian_1.igc',
        date="2021-03-08",
        pilot='Glenn Yeldezian',
        copilot='',
        glider_model="Discus 2c",
        glider_class='18-meter',
        callsign='KY',
        registration="N27GG",
        notes='03.08.2021 Task Day'
    )
    db.session.add(flight17)

    flight18 = Flight(
        id=18,
        user_id=6,
        igc_url='https://soarview.s3.amazonaws.com/seeder_glenn_yeldezian_2.igc',
        date="2021-03-07",
        pilot='Glenn Yeldezian',
        copilot='',
        glider_model="Discus 2c",
        glider_class='18-meter',
        callsign='KY',
        registration="N27GG",
        notes='03.07.2021 Task Day'
    )
    db.session.add(flight18)

    flight19 = Flight(
        id=19,
        user_id=6,
        igc_url='https://soarview.s3.amazonaws.com/seeder_glenn_yeldezian_3.igc',
        date="2020-11-19",
        pilot='Glenn Yeldezian',
        copilot='',
        glider_model="Discus 2c",
        glider_class='18-meter',
        callsign='KY',
        registration="N27GG",
        notes=''
    )
    db.session.add(flight19)

    flight20 = Flight(
        id=20,
        user_id=6,
        igc_url='https://soarview.s3.amazonaws.com/seeder_glenn_yeldezian_4.igc',
        date="2020-11-12",
        pilot='Glenn Yeldezian',
        copilot='',
        glider_model="Discus 2c",
        glider_class='18-meter',
        callsign='KY',
        registration="N27GG",
        notes=''
    )
    db.session.add(flight20)

    flight21 = Flight(
        id=21,
        user_id=6,
        igc_url='https://soarview.s3.amazonaws.com/seeder_glenn_yeldezian_5.igc',
        date="2020-11-07",
        pilot='Glenn Yeldezian',
        copilot='',
        glider_model="Discus 2c",
        glider_class='18-meter',
        callsign='KY',
        registration="N27GG",
        notes=''
    )
    db.session.add(flight21)

    flight22 = Flight(
        id=22,
        user_id=7,
        igc_url='https://soarview.s3.amazonaws.com/seeder_john_swanson_1.igc',
        date="2021-03-13",
        pilot='John Swanson',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='NS2',
        registration="N426RE",
        notes='Fun day, much better that I thought it was going to be. My racing strategy was to decide where to go, and then change my mind 3/4 of the way there. Not a winning strategy, but a fun day anyway. Lots of wind, not much sun, and some fun streets.'
    )
    db.session.add(flight22)

    flight23 = Flight(
        id=23,
        user_id=7,
        igc_url='https://soarview.s3.amazonaws.com/seeder_john_swanson_2.igc',
        date="2021-03-07",
        pilot='John Swanson',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='NS2',
        registration="N426RE",
        notes='I had more fun than some of the other pilots because I didn\'t fly yesterday (which turned out to a much better day).'
    )
    db.session.add(flight23)

    flight24 = Flight(
        id=24,
        user_id=7,
        igc_url='https://soarview.s3.amazonaws.com/seeder_john_swanson_3.igc',
        date="2020-11-21",
        pilot='John Swanson',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='NS2',
        registration="N426RE",
        notes=''
    )
    db.session.add(flight24)

    flight25 = Flight(
        id=25,
        user_id=7,
        igc_url='https://soarview.s3.amazonaws.com/seeder_john_swanson_4.igc',
        date="2020-11-12",
        pilot='John Swanson',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='NS2',
        registration="N426RE",
        notes='fish farm 5, tx world speedway 22, bellville 17, navisota 11 fairweather 14, scoh 2, 4000 start height, 2 hours. What a fun day!'
    )
    db.session.add(flight25)

    flight26 = Flight(
        id=26,
        user_id=7,
        igc_url='https://soarview.s3.amazonaws.com/seeder_john_swanson_5.igc',
        date="2020-10-04",
        pilot='John Swanson',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='NS2',
        registration="N426RE",
        notes='First 8 points of the dump task A, then bonner and Praire View. Fun day.'
    )
    db.session.add(flight26)

    db.session.commit()
    db.session.execute("SELECT setval(pg_get_serial_sequence('flights', 'id'), coalesce(max(id)+1, 1), false) FROM flights;")


def undo_flights():
    db.session.execute('TRUNCATE flights CASCADE;')
    db.session.commit()
