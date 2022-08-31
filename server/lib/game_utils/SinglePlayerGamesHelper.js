const axios = require('axios')
const pool = require('../../db/connect')

exports.GetRandomPhotosBasedOnGameDifficulty = async function(difficulty, easyPhotos, mediumPhotos, hardPhotos, impossiblePhotos){
    let roundsDifficultyAndCount
    let easySelectablePhotos 
    let mediumSelectablePhotos
    let hardSelectablePhotos
    let impossibleSelectablePhotos
    if(difficulty == 'easy'){

        easySelectablePhotos = getEasyPhotosSet()
        mediumSelectablePhotos = getMediumPhotoSet()

        if(easyPhotos.length <= easySelectablePhotos.size - 5){
            for(let i = 0; i < easyPhotos.length; i++){
                easySelectablePhotos.delete(parseInt(easyPhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        if(mediumPhotos.length <= mediumSelectablePhotos.size - 5){
            for(let i = 0; i < mediumPhotos.length; i++){
                mediumSelectablePhotos.delete(parseInt(mediumPhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        roundsDifficultyAndCount = [
            {difficulty: 'Easy', difficultyCount: process.env.AMT_OF_EASY_PHOTOS}, 
            {difficulty: 'Easy', difficultyCount: process.env.AMT_OF_EASY_PHOTOS}, 
            {difficulty: 'Easy', difficultyCount: process.env.AMT_OF_EASY_PHOTOS}, 
            {difficulty: 'Medium', difficultyCount: process.env.AMT_OF_MEDIUM_PHOTOS},
            {difficulty: 'Medium', difficultyCount: process.env.AMT_OF_MEDIUM_PHOTOS}    
        ]
    }
    else if(difficulty == 'medium'){
        easySelectablePhotos = getEasyPhotosSet()
        mediumSelectablePhotos = getMediumPhotoSet()
        hardSelectablePhotos = getHardPhotosSet()

        if(easyPhotos.length <= easySelectablePhotos.size - 5){
            for(let i = 0; i < easyPhotos.length; i++){
                easySelectablePhotos.delete(parseInt(easyPhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        if(mediumPhotos.length <= mediumSelectablePhotos.size - 5){
            for(let i = 0; i < mediumPhotos.length; i++){
                mediumSelectablePhotos.delete(parseInt(mediumPhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        if(hardPhotos.length <= hardSelectablePhotos.size - 5){
            for(let i = 0; i < hardPhotos.length; i++){
                hardSelectablePhotos.delete(parseInt(hardPhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }


        roundsDifficultyAndCount = [
            {difficulty: 'Easy', difficultyCount: process.env.AMT_OF_EASY_PHOTOS}, 
            {difficulty: 'Medium', difficultyCount: process.env.AMT_OF_MEDIUM_PHOTOS}, 
            {difficulty: 'Medium', difficultyCount: process.env.AMT_OF_MEDIUM_PHOTOS}, 
            {difficulty: 'Medium', difficultyCount: process.env.AMT_OF_MEDIUM_PHOTOS}, 
            {difficulty: 'Hard', difficultyCount: process.env.AMT_OF_HARD_PHOTOS}
        ]
    }
    else if(difficulty == 'hard'){
        mediumSelectablePhotos = getMediumPhotoSet()
        hardSelectablePhotos = getHardPhotosSet()
        impossibleSelectablePhotos = getImpossiblePhotosSet()

        if(mediumPhotos.length <= mediumSelectablePhotos.size - 5){
            for(let i = 0; i < mediumPhotos.length; i++){
                mediumSelectablePhotos.delete(parseInt(mediumPhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        if(hardPhotos.length <= hardSelectablePhotos.size - 5){
            for(let i = 0; i < hardPhotos.length; i++){
                hardSelectablePhotos.delete(parseInt(hardPhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        if(impossiblePhotos.length <= impossibleSelectablePhotos.size - 5){
            for(let i = 0; i < impossiblePhotos.length; i++){
                impossibleSelectablePhotos.delete(parseInt(impossiblePhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        roundsDifficultyAndCount = [
            {difficulty: 'Medium', difficultyCount: process.env.AMT_OF_MEDIUM_PHOTOS}, 
            {difficulty: 'Hard', difficultyCount: process.env.AMT_OF_HARD_PHOTOS}, 
            {difficulty: 'Hard', difficultyCount: process.env.AMT_OF_HARD_PHOTOS}, 
            {difficulty: 'Hard', difficultyCount: process.env.AMT_OF_HARD_PHOTOS}, 
            {difficulty: 'Impossible', difficultyCount: process.env.AMT_OF_IMPOSSIBLE_PHOTOS}]
    }
    else if(difficulty == 'impossible'){
        hardSelectablePhotos = getHardPhotosSet()
        impossibleSelectablePhotos = getImpossiblePhotosSet()

        if(hardPhotos.length <= hardSelectablePhotos.size - 5){
            for(let i = 0; i < hardPhotos.length; i++){
                hardSelectablePhotos.delete(parseInt(hardPhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        if(impossiblePhotos.length <= impossibleSelectablePhotos.size - 5){
            for(let i = 0; i < impossiblePhotos.length; i++){
                impossibleSelectablePhotos.delete(parseInt(impossiblePhotos[i]))
            }
        }
        else{
            // RETURN SHOULD RESET PLAYER LOCALSTORAGE
        }

        roundsDifficultyAndCount = [
            {difficulty: 'Hard', difficultyCount: process.env.AMT_OF_HARD_PHOTOS},
            {difficulty: 'Hard', difficultyCount: process.env.AMT_OF_HARD_PHOTOS}, 
            {difficulty: 'Impossible', difficultyCount: process.env.AMT_OF_IMPOSSIBLE_PHOTOS}, 
            {difficulty: 'Impossible', difficultyCount: process.env.AMT_OF_IMPOSSIBLE_PHOTOS}, 
            {difficulty: 'Impossible', difficultyCount: process.env.AMT_OF_IMPOSSIBLE_PHOTOS}
        ]
    }
    else{
        return false
    }    

    switch (difficulty){
        case 'easy':
            return getFinalizedListEasy(easySelectablePhotos, mediumSelectablePhotos);
        break;
        case 'medium':
            return getFinalizedListMedium(easySelectablePhotos, mediumSelectablePhotos, hardSelectablePhotos);
        break;
  
        case 'hard':
            return getFinalizedListHard(mediumSelectablePhotos, hardSelectablePhotos, impossibleSelectablePhotos);
            
        break;
  
        case 'impossible':
            return getFinalizedListImpossible(hardSelectablePhotos, impossibleSelectablePhotos);
            
        break;
    }

    
    return false
}

async function getFinalizedListEasy(easySelectablePhotos, mediumSelectablePhotos){
    let finalizedPhotoDetails = []
    let easySelectedPhotoNumbers = new Set()
    let mediumSelectedPhotoNumbers = new Set()


    for(let i = 0; i < 5; i++){

        if(i >= 3){
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * mediumSelectablePhotos.size)
                if(!mediumSelectedPhotoNumbers.has(randomNumber)){
                    mediumSelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            
            let photoname  = 'tempe_' + Array.from(mediumSelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
        }
        else{
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * easySelectablePhotos.size)
                if(!easySelectedPhotoNumbers.has(randomNumber)){
                    easySelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(easySelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
            
        }
        
    }
    return finalizedPhotoDetails

    
}
async function getFinalizedListMedium(easySelectablePhotos, mediumSelectablePhotos, hardSelectablePhotos){
    let finalizedPhotoDetails = []
    let easySelectedPhotoNumbers = new Set()
    let mediumSelectedPhotoNumbers = new Set()
    let hardSelectedPhotoNumbers = new Set()


    for(let i = 0; i < 5; i++){

        if(i >= 1 && i <= 3){
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * mediumSelectablePhotos.size)
                if(!mediumSelectedPhotoNumbers.has(randomNumber)){
                    mediumSelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(mediumSelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
        }
        else if(i == 0){
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * easySelectablePhotos.size)
                if(!easySelectedPhotoNumbers.has(randomNumber)){
                    easySelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(easySelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
            
        }
        else if(i == 4){
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * hardSelectablePhotos.size)
                if(!hardSelectedPhotoNumbers.has(randomNumber)){
                    hardSelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(hardSelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
        }
        
    }
    return finalizedPhotoDetails

    
}
async function getFinalizedListHard(mediumSelectablePhotos, hardSelectablePhotos, impossibleSelectablePhotos){
    let finalizedPhotoDetails = []
    let impossibleSelectedPhotoNumbers = new Set()
    let mediumSelectedPhotoNumbers = new Set()
    let hardSelectedPhotoNumbers = new Set()


    for(let i = 0; i < 5; i++){

        if(i >= 1 && i <= 3){
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * hardSelectablePhotos.size)
                if(!hardSelectedPhotoNumbers.has(randomNumber)){
                    hardSelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(hardSelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
        }
        else if(i == 0){
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * mediumSelectablePhotos.size)
                if(!mediumSelectedPhotoNumbers.has(randomNumber)){
                    mediumSelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(mediumSelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
            
        }
        else if(i == 4){
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * impossibleSelectablePhotos.size)
                if(!impossibleSelectedPhotoNumbers.has(randomNumber)){
                    impossibleSelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(impossibleSelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
        }
        
    }
    return finalizedPhotoDetails

    
}
async function getFinalizedListImpossible(hardSelectablePhotos, impossibleSelectablePhotos){
    let finalizedPhotoDetails = []
    let hardSelectedPhotoNumbers = new Set()
    let impossibleSelectedPhotoNumbers = new Set()


    for(let i = 0; i < 5; i++){


        if(i >= 2){
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * impossibleSelectablePhotos.size)
                if(!impossibleSelectedPhotoNumbers.has(randomNumber)){
                    impossibleSelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(impossibleSelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
        }
        else{
            let foundNewNumber = false
            let randomNumber
            while(foundNewNumber === false){
                randomNumber = Math.floor(Math.random() * hardSelectablePhotos.size)
                if(!hardSelectedPhotoNumbers.has(randomNumber)){
                    hardSelectedPhotoNumbers.add(randomNumber)
                    foundNewNumber = true
                }
            }
            
            let photoname  = 'tempe_' + Array.from(hardSelectablePhotos)[randomNumber] + '.jpg'

            const roundQuery = await pool.query(
                "SELECT * FROM photos WHERE photoname=($1)",
                [photoname]
            )
            if(roundQuery.rowCount == 0){
                return false
            }
            finalizedPhotoDetails.push(roundQuery.rows[0])
            
        }
        
    }
    return finalizedPhotoDetails
}

function getEasyPhotosSet(){
    const easyPhotosSet = new Set([1382, 1661, 1698, 1699, 24, 1328, 1219, 498, 1330, 1872, 1942, 1976, 809, 1605, 1736, 762, 870, 383, 1835, 1909, 1943, 661, 897, 810, 1242, 552, 1837, 945, 781, 930, 993, 1738, 1838, 1945, 1147, 960, 1001, 1163, 1, 1213, 1578, 1703, 1946, 1221, 1002, 1609, 1246, 409, 1947, 1214, 877, 1238, 1035, 1254, 1581, 1647, 1336, 1880, 1362, 1670, 1523, 1391, 1446, 1650, 1918, 1952, 1313, 1673, 1710, 1884, 1449, 1809, 1528, 729, 212, 1231, 728, 1588, 1785, 1190, 1207, 765, 370, 381, 385, 1811, 1888, 1590, 1851, 1924, 1531, 1555, 1591, 1679, 1852, 1532, 1592, 1680, 1926, 1481, 1593, 1594, 1815, 1854, 1085, 1719, 1384, 850, 1043, 1133, 1173, 1004, 1134, 1855, 1928, 1596, 1248, 793, 849, 1086, 1273, 1208, 1020, 1166, 1013, 1052, 956, 1403, 1404, 1894, 1536, 1929, 998, 1022, 918, 950, 991, 1015, 1128, 1218, 1176, 886, 1433, 1757, 43, 1006, 797, 26, 19, 47, 48, 58, 61, 63, 65, 76, 33, 7, 1460, 1538, 
        1794, 812, 2, 1795, 1562, 1930, 1088, 1129, 6, 1268, 98, 101, 102, 730, 59, 10, 1600, 1687, 1724, 1860, 1601, 1761, 1602, 1899, 1933, 1603, 1863, 1900, 1968, 84, 1728, 1935, 1936, 1903, 1937, 1767, 1867, 1938, 1972, 1768, 1973, 600, 1870, 51, 41, 112, 129, 130, 183, 186, 109, 154, 132, 157, 89, 108, 97, 107, 155, 235, 254, 269, 279, 294, 296, 301, 117, 256, 223, 280, 264, 307, 281, 299, 210, 218, 316, 329, 332, 335, 339, 345, 295, 274, 414, 323, 353, 327, 326, 354, 413, 346, 379, 357, 425, 431, 438, 439, 444, 447, 453, 457, 485, 486, 501, 386, 505, 518, 522, 424, 509, 308, 451, 348, 437, 527, 553, 601, 611, 606, 443, 620, 622, 624, 621, 558, 625, 589, 566, 544, 609, 555, 655, 690, 689, 653, 378, 734, 903, 935, 1040, 788, 1220, 779, 654, 114, 
        967, 1537, 1697, 1809, 1811, 1815, 1835, 1837, 1838, 1851, 1852, 1854, 1855, 1860, 1863, 1867, 1870, 1872, 1880, 1884, 1888, 1894, 1899, 1900, 1903, 1909, 1918, 1924, 1926, 1928, 1929, 1930, 1933, 1935, 1936, 1937, 1938, 1942, 1943, 1945, 1946, 1947, 1952, 1968, 1972, 1973, 1976])
    return easyPhotosSet
}

function getMediumPhotoSet(){
    const mediumPhotosSet = new Set([1574, 1640, 1735, 440, 442, 262, 836, 263, 573, 452, 406, 744, 1463, 1515, 854, 872, 920, 1873, 1977, 753, 38, 855, 1642, 846, 772, 881, 1663, 1701, 1464, 889, 640, 1331, 1874, 1944, 1438, 1490, 837, 754, 373, 763, 819, 937, 882, 874, 782, 811, 1540, 1607, 1333, 1385, 952, 936, 944, 1049, 738, 122, 1775, 1800, 1912, 977, 1467, 859, 1307, 1878, 1913, 1206, 805, 1181, 994, 1066, 1083, 570, 1361, 1494, 1580, 1610, 1646, 1705, 1777, 1222, 1879, 1948, 1279, 1003, 954, 1051, 1669, 1778, 1388, 1495, 1076, 1027, 1497, 1612, 103, 1881, 1916, 1985, 1364, 1311, 1548, 1672, 1806, 1845, 1447, 1746, 1846, 1393, 1526, 1783, 1954, 201, 118, 1653, 1712, 1369, 1263, 1503, 1215, 1552, 1676, 1713, 1956, 1272, 746, 735, 1589, 1957, 1787, 1812, 1889, 1346, 1426, 1453, 1479, 1347, 1373, 1427, 1556, 1622, 1814, 1960, 1320, 1428, 1507, 1533, 1557, 1718, 1754, 1790, 1482, 1508, 1595, 986, 1660, 1235, 1332, 1439, 1491, 906, 785, 978, 1093, 1019, 1337, 54, 1389, 1417, 979, 1028, 1044, 1296, 1376, 1509, 1893, 1962, 1683, 1792, 876, 1817, 1856, 1175, 1192, 1265, 840, 858, 997, 1045, 931, 766, 747, 1061, 866, 1005, 784, 875, 996, 421, 1078, 1103, 1297, 1377, 1458, 1510, 1560, 909, 941, 1070, 1234, 740, 777, 824, 860, 974, 1039, 917, 1151, 795, 1184, 1046, 851, 815, 1217, 868, 1818, 1459, 1511, 1014, 1721, 1895, 1201, 1104, 1087, 1161, 1259, 769, 778, 807, 852, 3, 5, 23, 25, 35, 40, 45, 74, 77, 71, 36, 52, 1007, 1326, 783, 1354, 1461, 1599, 57, 46, 1628, 1686, 792, 1820, 70, 83, 56, 8, 1145, 50, 1243, 18, 72, 90, 92, 93, 94, 100, 731, 106, 865, 848, 857, 1563, 1931, 1725, 1822, 1932, 1966, 1726, 1633, 1826, 1864, 1634, 1692, 1865, 1902, 1766, 1829, 1904, 1732, 1769, 1832, 1940, 119, 110, 124, 126, 144, 163, 171, 178, 182, 188, 191, 91, 153, 95, 105, 127, 113, 104, 96, 202, 175, 116, 123, 193, 215, 217, 227, 115, 168, 234, 248, 268, 287, 291, 293, 152, 267, 306, 285, 226, 225, 173, 270, 288, 138, 164, 300, 258, 304, 298, 282, 319, 334, 338, 303, 243, 393, 405, 412, 230, 257, 351, 407, 371, 347, 328, 361, 317, 380, 325, 289, 233, 389, 321, 245, 211, 318, 436, 450, 473, 476, 499, 341, 333, 507, 510, 519, 483, 397, 496, 487, 478, 467, 464, 454, 455, 503, 
369, 490, 441, 523, 469, 342, 508, 427, 530, 557, 565, 583, 596, 597, 610, 513, 514, 546, 458, 617, 618, 608, 539, 516, 574, 540, 569, 591, 578, 619, 572, 531, 564, 537, 579, 598, 586, 614, 525, 631, 644, 662, 671, 682, 698, 709, 677, 670, 724, 657, 715, 650, 717, 708, 627, 701, 853, 727, 887, 951, 1008, 1072, 1089, 975, 1081, 1409, 761, 1000, 742, 1534, 826, 879, 1146, 1098, 1535, 844, 562, 1056, 1734, 1770, 1871, 1941, 1800, 1806, 1812, 1814, 1817, 1818, 1820, 1822, 1826, 1829, 1832, 1845, 1846, 1856, 1864, 1865, 1871, 1873, 1874, 1878, 1879, 1881, 1889, 1893, 1895, 1902, 1904, 1912, 1913, 1916, 1931, 1932, 1940, 1941, 1944, 1948, 1954, 1956, 1957, 1960, 1962, 1966, 1977, 1985])
    
return mediumPhotosSet
}

function getHardPhotosSet(){
    const hardPhotosSet = new Set([121, 571, 1356, 1604, 363, 743, 1410, 845, 1772, 771, 189, 904, 799, 888, 1836, 1576, 921, 764, 790, 1411, 1357, 1798, 1910, 800, 801, 873, 165, 745, 1304, 1036, 946, 856, 1664, 1799, 1875, 838, 914, 922, 536, 1518, 1017, 1025, 1041, 1057, 1082, 1090, 1155, 1171, 1180, 988, 1205, 1253, 1058, 249, 1665, 1839, 1877, 1981, 1334, 1360, 1386, 1519, 1520, 748, 1704, 1740, 1776, 1801, 739, 1278, 1010, 1018, 1034, 1042, 1075, 1091, 1387, 1442, 893, 867, 794, 1148, 1189, 814, 1741, 1282, 1802, 1841, 1149, 1165, 1545, 1611, 1668, 1742, 1984, 1469, 1546, 1582, 1445, 1390, 1779, 1471, 884, 900, 1547, 1583, 1472, 1285, 1805, 1844, 1917, 1951, 207, 
        1365, 1524, 1614, 1781, 1883, 1366, 1473, 1499, 1525, 1549, 1782, 1807, 1953, 1287, 1367, 1474, 417, 1550, 500, 1652, 1616, 1711, 
        1314, 1422, 1368, 1394, 1475, 1501, 1551, 1748, 1395, 1316, 1344, 34, 1182, 1239, 1396, 1654, 1749, 1922, 1199, 756, 356, 364, 368, 372, 374, 1553, 1850, 1371, 1452, 1504, 396, 1656, 1715, 1292, 1318, 1399, 1752, 1890, 1925, 1959, 1454, 1506, 1348, 1658, 1789, 1891, 1374, 1400, 1401, 1623, 1681, 1892, 1321, 1349, 1429, 1456, 1558, 1092, 88, 1682, 1271, 1358, 1412, 1517, 841, 987, 1157, 962, 1101, 1141, 1309, 1363, 1444, 1470, 1496, 939, 947, 971, 1060, 1110, 1457, 1483, 1816, 1559, 1256, 1431, 1720, 1191, 315, 804, 813, 924, 972, 1037, 1053, 1111, 915, 989, 1127, 1150, 908, 1069, 1143, 1012, 1225, 1323, 1963, 1136, 933, 1597, 901, 957, 1038, 1079, 1185, 1202, 1250, 1258, 526, 796, 910, 1047, 934, 1274, 1257, 1194, 1062, 990, 1406, 894, 1324, 1857, 1105, 13, 1080, 
        4, 60, 1209, 833, 1168, 1120, 942, 759, 1071, 1121, 1153, 1186, 17, 42, 44, 53, 64, 68, 69, 75, 750, 1211, 1097, 1325, 1353, 1379, 1486, 73, 78, 1627, 1758, 27, 1380, 1435, 85, 99, 1723, 816, 1896, 1964, 1251, 14, 82, 37, 760, 1276, 15, 1137, 1169, 1195, 66, 81, 732, 20, 49, 21, 11, 1487, 1513, 830, 32, 1629, 1821, 1897, 1965, 839, 1688, 1861, 1565, 1823, 1824, 1862, 1632, 
        1764, 1969, 172, 1827, 1569, 1635, 1828, 1866, 1694, 1731, 1830, 1571, 1939, 497, 1572, 1638, 1869, 659, 737, 310, 111, 120, 133, 136, 139, 143, 145, 162, 187, 194, 195, 203, 190, 146, 131, 128, 12, 733, 151, 125, 149, 181, 196, 174, 184, 170, 208, 221, 224, 231, 232, 86, 87, 134, 236, 239, 246, 265, 272, 284, 290, 259, 305, 192, 275, 276, 177, 142, 277, 273, 158, 200, 240, 266, 252, 185, 244, 253, 322, 336, 337, 260, 255, 330, 350, 388, 391, 392, 394, 312, 324, 408, 387, 320, 384, 403, 367, 398, 314, 419, 418, 423, 429, 432, 433, 445, 456, 462, 470, 471, 479, 482, 489, 492, 375, 401, 349, 404, 511, 520, 524, 477, 358, 340, 461, 435, 344, 463, 494, 376, 410, 22, 495, 533, 534, 541, 551, 554, 560, 561, 575, 590, 592, 602, 576, 459, 612, 616, 543, 548, 581, 577, 559, 550, 605, 466, 594, 567, 502, 607, 632, 642, 647, 667, 693, 695, 696, 704, 711, 714, 545, 680, 666, 630, 676, 681, 675, 705, 713, 649, 700, 679, 707, 634, 603, 751, 770, 798, 808, 817, 835, 919, 943, 983, 1048, 1170, 1179, 1244, 1301, 1462, 673, 1277, 1032, 1252, 911, 1514, 1228, 1114, 1212, 1016, 1907, 1798, 1799, 1801, 1802, 1805, 1807, 1816, 1821, 1823, 1824, 1827, 1828, 1830, 1836, 1839, 1841, 1844, 1850, 1857, 1861, 1862, 1866, 1869, 1875, 1877, 1883, 1890, 1891, 1892, 1896, 1897, 1907, 1910, 1917, 1922, 1925, 1939, 1951, 1953, 1959, 1963, 1964, 1965, 1969, 1981, 1984])
    return hardPhotosSet
}

function getImpossiblePhotosSet(){
    const impossiblePhotosSet = new Set([448, 636, 261, 752, 1771, 205, 1796, 1302, 1031, 780, 880, 862, 1834, 1908, 1575, 481, 529, 1437, 1489, 1641, 1662, 1700, 1329, 1797, 789, 827, 818, 896, 912, 1303, 1539, 953, 773, 828, 1138, 1606, 1737, 1773, 1383, 1978, 1979, 1516, 871, 863, 905, 913, 929, 961, 890, 755, 847, 864, 791, 1577, 802, 1466, 1359, 1440, 820, 829, 1065, 898, 365, 1643, 1702, 1774, 1492, 1876, 1911, 1980, 938, 1305, 976, 1413, 928, 718, 968, 984, 1009, 1033, 1073, 1074, 1541, 1099, 1115, 1123, 1131, 1139, 1188, 1197, 1306, 1229, 1107, 1608, 1644, 1739, 1414, 1441, 1493, 985, 1542, 1579, 1200, 1100, 969, 1645, 1281, 758, 1666, 1230, 1840, 229, 1982, 1335, 1237, 1245, 1261, 1270, 1026, 1050, 1108, 1116, 1124, 1415, 1468, 767, 885, 1132, 1140, 1164, 1172, 1198, 1308, 1544, 656, 1156, 1667, 1543, 1914, 1983, 1262, 1084, 806, 1706, 1803, 1842, 1915, 1949, 1416, 1443, 1521, 1284, 1310, 1418, 1648, 1707, 1743, 1804, 1843, 1950, 1338, 1419, 1613, 1649, 1671, 1708, 1744, 1780, 1882, 1339, 1498, 1584, 1340, 1745, 1709, 1286, 1312, 1392, 1420, 309, 
        1585, 1615, 1651, 1919, 1341, 1421, 1448, 1500, 1288, 1586, 1674, 1747, 1808, 1847, 1885, 1920, 1342, 1527, 1587, 1502, 1617, 1675, 1784, 1848, 1886, 1921, 1955, 1289, 1315, 1343, 1423, 1450, 1476, 1290, 1370, 726, 1424, 1451, 1477, 1529, 377, 1247, 1618, 1810, 1849, 1887, 1223, 1255, 1264, 1280, 736, 359, 362, 366, 382, 1291, 1619, 1655, 1677, 1714, 1750, 1786, 1923, 1317, 1345, 1397, 1425, 1478, 1554, 1620, 1678, 1751, 1958, 1372, 1398, 1505, 1621, 1657, 1716, 1788, 1480, 1813, 1293, 1319, 1717, 1753, 1853, 1294, 1455, 1659, 1927, 1961, 1295, 1375, 1067, 1059, 1125, 923, 970, 1174, 1077, 1624, 1755, 1791, 1465, 776, 823, 832, 1117, 995, 1011, 1109, 1283, 1522, 883, 891, 899, 907, 963, 1068, 1094, 1102, 1118, 1126, 1322, 1350, 1402, 1430, 1158, 1625, 1756, 1142, 1183, 1224, 1232, 1240, 757, 775, 822, 831, 216, 916, 932, 940, 964, 980, 1021, 1029, 1095, 1119, 1135, 1216, 955, 892, 948, 1193, 1233, 1351, 1405, 1432, 1484, 1112, 1241, 1378, 965, 749, 1249, 1266, 925, 949, 1030, 1054, 1096, 1144, 1152, 1160, 1226, 1267, 1275, 786, 842, 474, 768, 878, 926, 958, 982, 999, 1023, 1177, 902, 973, 981, 1298, 1352, 1210, 1485, 1626, 1684, 1793, 1598, 1159, 966, 1113, 1178, 1203, 1227, 787, 825, 31, 39, 30, 28, 55, 62, 79, 80, 834, 1299, 1407, 1434, 1512, 843, 1561, 1685, 16, 1722, 1819, 1858, 1300, 1408, 67, 1759, 1859, 1063, 741, 29, 9, 803, 774, 821, 167, 1760, 1564, 1167, 1630, 1898, 1762, 1689, 1631, 1967, 1055, 1566, 1690, 1727, 1763, 1825, 1934, 1567, 1691, 1901, 1568, 206, 1729, 1765, 1970, 1693, 1730, 1971, 313, 1570, 488, 1636, 1637, 1695, 1831, 1868, 1905, 1696, 1733, 720, 699, 1906, 1974, 646, 639, 692, 641, 135, 137, 147, 148, 161, 176, 197, 
        199, 150, 156, 140, 204, 198, 166, 160, 141, 169, 213, 214, 220, 222, 228, 159, 179, 180, 241, 242, 251, 271, 283, 286, 297, 292, 278, 237, 302, 238, 250, 219, 247, 209, 311, 343, 352, 626, 1530, 399, 400, 411, 416, 402, 360, 395, 420, 422, 426, 428, 446, 468, 484, 491, 390, 355, 415, 475, 506, 512, 515, 472, 465, 521, 434, 449, 493, 517, 532, 538, 542, 547, 549, 331, 568, 580, 584, 585, 587, 588, 504, 563, 535, 604, 599, 615, 582, 556, 595, 593, 628, 629, 633, 635, 637, 638, 651, 658, 663, 665, 669, 684, 685, 688, 691, 694, 697, 702, 706, 710, 712, 623, 528, 678, 683, 613, 480, 645, 648, 719, 722, 723, 725, 687, 703, 686, 668, 674, 660, 664, 716, 672, 861, 869, 895, 927, 959, 992, 1024, 1106, 1122, 1130, 1154, 1162, 1196, 1269, 1204, 1436, 1260, 1327, 721, 652, 460, 1064, 643, 1488, 1187, 1236, 1355, 1381, 1573, 1639, 1833, 1975, 1796, 1797, 1803, 1804, 1808, 1810, 1813, 1819, 1825, 1831, 1833, 1834, 1840, 1842, 1843, 1847, 1848, 1849, 1853, 1858, 1859, 1868, 1876, 1882, 1885, 1886, 1887, 1898, 1901, 1905, 1906, 1908, 1911, 1914, 1915, 1919, 1920, 1921, 1923, 1927, 1934, 1949, 1950, 1955, 1958, 1961, 1967, 1970, 1971, 1974, 1975, 1978, 1979, 1980, 1982, 1983])
    return impossiblePhotosSet
}