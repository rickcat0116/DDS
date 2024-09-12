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
            { title: "Denver Nuggets", image: Denver, link:'' },
            { title: "Minnesota Timberwolves", image: Minnesota, link:'' },
            { title: "Oklahoma City Thunder", image: Oklahoma, link:'' },
            { title: "Portland Trail Blazers", image: Portland , link:''},
            { title: "Utah Jazz", image: Utah, link:'' },
        ],
    },
    {
        division: "Southwest",
        teams: [
            { title: "Golden State Warriors", image: Warriors, link:'' },
            { title: "Los Angeles Clippers", image: Clippers, link:'' },
            { title: "Los Angeles Lakers", image: Lakers, link:'' },
            { title: "Phoenix Suns", image: Suns, link:'' },
            { title: "Sacramento Kings", image: Kings, link:'' },
        ],
    },
    {
        division: "Northwest",
        teams: [
            { title: "Dallas Mavericks", image: Dallas, link:'' },
            { title: "Houston Rockets", image: Houston, link:'' },
            { title: "Memphis Grizzlies", image: Memphis, link:'' },
            { title: "New Orleans Pelicans", image: Pelicans, link:'' },
            { title: "San Antonio Spurs", image: Spurs, link:'' },
        ],
    },
]

export const EAST_DIVISIONS = [
    {
        division: "Atlantic",
        teams: [
            { title: "Boston Celtics", image: Boston, link:'' },
            { title: "New Jersey Nets", image: Nets, link:'' },
            { title: "New York Knicks", image: Knicks, link:'' },
            { title: "Philadelphia 76ers", image: Phila, link:'' },
            { title: "Toronto Raptors", image: Raptors, link:'' },
        ],
    },
    {
        division: "Central",
        teams: [
            { title: "Chicago Bulls", image: Bulls, link:'' },
            { title: "Cleveland Cavaliers", image: Cleveland, link:'' },
            { title: "Detroit Pistons", image: Detroit, link:'' },
            { title: "Indiana Pacers", image: Pacers, link:'' },
            { title: "Milwaukee Bucks", image: Bucks, link:'' },
        ],
    },
    {
        division: "Southeast",
        teams: [
            { title: "Atlanta Hawks", image: Hawks, link:'' },
            { title: "Charlotte Hornets", image: Hornets, link:'' },
            { title: "Miami Heat", image: Heat, link:'' },
            { title: "Orlando Magic", image: Magic, link:'' },
            { title: "Washington Wizards", image: Wizards, link:'' },
        ],
    },
]

export const TACTICS = [
    {
        title:'포포 / 밸런스',
        menu: [
            { title:'팀 순위', link:'' },
            { title:'선수 순위', link:'' },
            { title:'선수 명단', link:'' }
        ]
    },
    {
        title:'세세 / 어택',
        menu: [
            { title:'팀 순위', link:'' },
            { title:'선수 순위', link:'' },
            { title:'선수 명단', link:'' }
        ]
    },
    {
        title:'밸런스 / 스위치',
        menu: [
            { title:'팀 순위', link:'' },
            { title:'선수 순위', link:'' },
            { title:'선수 명단', link:'' }
        ]
    },
    {
        title:'그라인드 / 맨투맨',
        menu: [
            { title:'팀 순위', link:'' },
            { title:'선수 순위', link:'' },
            { title:'선수 명단', link:'' }
        ]
    }
]