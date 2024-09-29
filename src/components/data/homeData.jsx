import Denver from '../../assets/img/northwest/t_denver.webp';
import Minnesota from '../../assets/img/northwest/t_wolves.webp';
import Oklahoma from '../../assets/img/northwest/t_okc.webp';
import Portland from '../../assets/img/northwest/t_portl.webp';
import Utah from '../../assets/img/northwest/t_jazz.webp';

import Warriors from '../../assets/img/pacific/t_gs.webp';
import Clippers from '../../assets/img/pacific/t_clippers.webp';
import Lakers from '../../assets/img/pacific/t_lakers.webp';
import Suns from '../../assets/img/pacific/t_suns.webp';
import Kings from '../../assets/img/pacific/t_kings.webp'

import Dallas from '../../assets/img/southwest/t_mav.webp';
import Houston from '../../assets/img/southwest/t_rockets.webp';
import Memphis from '../../assets/img/southwest/t_mem.webp';
import Pelicans from '../../assets/img/southwest/t_pelicans.webp';
import Spurs from '../../assets/img/southwest/t_spurs.webp';

import Boston from '../../assets/img/atlantic/t_boston.webp';
import Nets from '../../assets/img/atlantic/t_brook.webp';
import Knicks from '../../assets/img/atlantic/t_knicks.webp';
import Phila from '../../assets/img/atlantic/t_76.webp';
import Raptors from '../../assets/img/atlantic/t_raptors.webp';

import Bulls from '../../assets/img/central/t_bulls.webp';
import Cleveland from '../../assets/img/central/t_cav.webp';
import Detroit from '../../assets/img/central/t_det.webp';
import Pacers from '../../assets/img/central/t_indiana.webp';
import Bucks from '../../assets/img/central/t_bucks.webp';

import Hawks from '../../assets/img/southeast/t_hawks.webp';
import Hornets from '../../assets/img/southeast/t_hornets.webp';
import Heat from '../../assets/img/southeast/t_heat.webp';
import Magic from '../../assets/img/southeast/t_magic.webp';
import Wizards from '../../assets/img/southeast/t_wizards.webp';


export const WEST_DIVISIONS = [
    {
        division: "Northwest",
        teams: [
            { title: "Denver Nuggets", image: Denver, link:'https://dds-simulation.web.app/reg01/DENNuggets_Roster.html' },
            { title: "Minnesota Timberwolves", image: Minnesota, link:'https://dds-simulation.web.app/reg01/MINTimberwolves_Roster.html' },
            { title: "Oklahoma City Thunder", image: Oklahoma, link:'https://dds-simulation.web.app/reg01/OKCThunder_Roster.html' },
            { title: "Portland Trail Blazers", image: Portland , link:'https://dds-simulation.web.app/reg01/PORTrailblazers_Roster.html'},
            { title: "Utah Jazz", image: Utah, link:'https://dds-simulation.web.app/reg01/UTAJazz_Roster.html' },
        ],
    },
    {
        division: "Southwest",
        teams: [
            { title: "Golden State Warriors", image: Warriors, link:'https://dds-simulation.web.app/reg01/GSWWarriors_Roster.html' },
            { title: "Los Angeles Clippers", image: Clippers, link:'https://dds-simulation.web.app/reg01/LACClippers_Roster.html' },
            { title: "Los Angeles Lakers", image: Lakers, link:'https://dds-simulation.web.app/reg01/LALLakers_Roster.html' },
            { title: "Phoenix Suns", image: Suns, link:'https://dds-simulation.web.app/reg01/PHOSuns_Roster.html' },
            { title: "Sacramento Kings", image: Kings, link:'https://dds-simulation.web.app/reg01/SACKings_Roster.html' },
        ],
    },
    {
        division: "Northwest",
        teams: [
            { title: "Dallas Mavericks", image: Dallas, link:'https://dds-simulation.web.app/reg01/DALMavericks_Roster.html' },
            { title: "Houston Rockets", image: Houston, link:'https://dds-simulation.web.app/reg01/HOURockets_Roster.html' },
            { title: "Memphis Grizzlies", image: Memphis, link:'https://dds-simulation.web.app/reg01/MEMGrizzlies_Roster.html' },
            { title: "New Orleans Pelicans", image: Pelicans, link:'https://dds-simulation.web.app/reg01/NOPPelicans_Roster.html' },
            { title: "San Antonio Spurs", image: Spurs, link:'https://dds-simulation.web.app/reg01/SASSpurs_Roster.html' },
        ],
    },
]

export const EAST_DIVISIONS = [
    {
        division: "Atlantic",
        teams: [
            { title: "Boston Celtics", image: Boston, link:'https://dds-simulation.web.app/reg01/BOSCeltics_Roster.html' },
            { title: "Brooklyn Nets", image: Nets, link:'https://dds-simulation.web.app/reg01/BKNNets_Roster.html' },
            { title: "New York Knicks", image: Knicks, link:'https://dds-simulation.web.app/reg01/NYKKnicks_Roster.html' },
            { title: "Philadelphia 76ers", image: Phila, link:'https://dds-simulation.web.app/reg01/PHI76ers_Roster.html' },
            { title: "Toronto Raptors", image: Raptors, link:'https://dds-simulation.web.app/reg01/TORRaptors_Roster.html' },
        ],
    },
    {
        division: "Central",
        teams: [
            { title: "Chicago Bulls", image: Bulls, link:'https://dds-simulation.web.app/reg01/CHIBulls_Roster.html' },
            { title: "Cleveland Cavaliers", image: Cleveland, link:'https://dds-simulation.web.app/reg01/CLECavaliers_Roster.html' },
            { title: "Detroit Pistons", image: Detroit, link:'https://dds-simulation.web.app/reg01/DETPistons_Roster.html' },
            { title: "Indiana Pacers", image: Pacers, link:'https://dds-simulation.web.app/reg01/INDPacers_Roster.html' },
            { title: "Milwaukee Bucks", image: Bucks, link:'https://dds-simulation.web.app/reg01/MILBucks_Roster.html' },
        ],
    },
    {
        division: "Southeast",
        teams: [
            { title: "Atlanta Hawks", image: Hawks, link:'https://dds-simulation.web.app/reg01/ATLHawks_Roster.html' },
            { title: "Charlotte Hornets", image: Hornets, link:'https://dds-simulation.web.app/reg01/CHAHornets_Roster.html' },
            { title: "Miami Heat", image: Heat, link:'https://dds-simulation.web.app/reg01//MIAHeat_Roster.html' },
            { title: "Orlando Magic", image: Magic, link:'https://dds-simulation.web.app/reg01/ORLMagic_Roster.html' },
            { title: "Washington Wizards", image: Wizards, link:'https://dds-simulation.web.app/reg01/WASWizards_Roster.html' },
        ],
    },
]

export const TACTICS = [
    {
        title:'포포',
        menu: [
            { title:'팀 순위', link:'https://dds-simulation.web.app/sim01/FMKStandings.html' },
            { title:'선수 순위', link:'https://dds-simulation.web.app/sim01/FMKLeagueLeaders.html' },
            { title:'선수 명단', link:'https://dds-simulation.web.app/sim01/PlayerIndex.html' }
        ]
    },
    {
        title:'세세',
        menu: [
            { title:'팀 순위', link:'https://dds-simulation.web.app/sim02/FMKStandings.html' },
            { title:'선수 순위', link:'https://dds-simulation.web.app/sim02/FMKLeagueLeaders.html' },
            { title:'선수 명단', link:'https://dds-simulation.web.app/sim02/PlayerIndex.html' }
        ]
    },
    {
        title:'밸런스',
        menu: [
            { title:'팀 순위', link:'https://dds-simulation.web.app/sim03/FMKStandings.html' },
            { title:'선수 순위', link:'https://dds-simulation.web.app/sim03/FMKLeagueLeaders.html' },
            { title:'선수 명단', link:'https://dds-simulation.web.app/sim03/PlayerIndex.html' }
        ]
    },
    {
        title:'그라인드',
        menu: [
            { title:'팀 순위', link:'https://dds-simulation.web.app/sim04/FMKStandings.html' },
            { title:'선수 순위', link:'https://dds-simulation.web.app/sim04/FMKLeagueLeaders.html' },
            { title:'선수 명단', link:'https://dds-simulation.web.app/sim04/PlayerIndex.html' }
        ]
    },
    {
        title:'페앤스',
        menu: [
            { title:'팀 순위', link:'https://dds-simulation.web.app/sim05/FMKStandings.html' },
            { title:'선수 순위', link:'https://dds-simulation.web.app/sim05/FMKLeagueLeaders.html' },
            { title:'선수 명단', link:'https://dds-simulation.web.app/sim05/PlayerIndex.html' }
        ]
    },
    {
        title:'퍼포',
        menu: [
            { title:'팀 순위', link:'https://dds-simulation.web.app/sim06/FMKStandings.html' },
            { title:'선수 순위', link:'https://dds-simulation.web.app/sim06/FMKLeagueLeaders.html' },
            { title:'선수 명단', link:'https://dds-simulation.web.app/sim06/PlayerIndex.html' }
        ]
    }
]