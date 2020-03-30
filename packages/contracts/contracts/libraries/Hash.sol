pragma solidity >= 0.6.0;

import { Hasher } from "merkle-tree-rollup/contracts/library/Types.sol";


library Poseidon {
    /**
     * @dev This is a dummy implementation for contract compilation
     * We'll use a generated library by circomlib instead of this dummy library
     * Please see
     * 1. migrations/3_deploy_poseidon.js
     * 2. https://github.com/iden3/circomlib/blob/master/src/poseidon_gencontract.js
     */
    function poseidon(uint256[] calldata) external pure returns(uint256) {
        return 0;
    }
}

library MiMC {
    /**
     * @dev This is a dummy implementation for contract compilation
     * We'll use a generated library by circomlib instead of this dummy library
     * Please see
     * 1. migrations/2_deploy_mimc.js
     * 2. https://github.com/iden3/circomlib/blob/master/src/mimcsponge_gencontract.js
     */
    function MiMCSponge(uint256 in_xL, uint256 in_xR, uint256 in_k) external pure returns (uint256 xL, uint256 xR) {
    }
}

/**
 * @dev This will be used to provide hash functions to calculate roll up.
 *      Please see RollUpLib.sol from 'merkle-tree-rollup'.
 */
library Hash {
    uint256 constant k =  21888242871839275222246405745257275088548364400416034343698204186575808495617;

    function poseidon() internal pure returns (Hasher memory) {
        return Hasher(poseidonParentOf, poseidonPrehashedZeroes());
    }

    /**
     * @dev Costs about 100k gas
     */
    function poseidonParentOf(uint256 left, uint256 right) internal pure returns (uint256) {
        uint[] memory res = new uint[](2);
        res[0] = left;
        res[1] = right;
        try Poseidon.poseidon(res) returns (uint val) {
            return val;
        } catch {
            revert("poseidon hash error");
        }
    }

    function poseidonPrehashedZeroes() internal pure returns (uint[] memory preHashed) {
        preHashed = new uint[](32);
        preHashed[0] = 0;
        preHashed[1] = 951383894958571821976060584138905353883650994872035011055912076785884444545;
        preHashed[2] = 20622346557934808217011721426661266483227782601688308996572323237868248378218;
        preHashed[3] = 9824383624068251658076004948987922624579386843373418302611235390446333218543;
        preHashed[4] = 18231051098028563566680291532078429851434716680352819569730767461390496150778;
        preHashed[5] = 3353212758970507511129878484465451720398128800239371146311683143363228006106;
        preHashed[6] = 11217981488147314489933157152414929198080353151522289497544152685671318494641;
        preHashed[7] = 15036778088095722022055958830077231912659267101273997428998619074916612435352;
        preHashed[8] = 13902072967731839344862497510839651364835012530289392251474510732102392496571;
        preHashed[9] = 11544666763895735667784949329006117565540509653060441453303165109269815573544;
        preHashed[10] = 21510646961350375150419802995301138938521651775264825801359130949650284310444;
        preHashed[11] = 8352951083833165756052596980166442098457751367763718836446899882180191056793;
        preHashed[12] = 15343731119332398035690133781878944808098758389875899387389032483608612201975;
        preHashed[13] = 17859889065964874059806749716671767294095122942218003054680455600278721682760;
        preHashed[14] = 13005683751955859646895222251347854050150102883725283511471451046875989680212;
        preHashed[15] = 4205649174226986356930070553187886804719468302164503100263635377186950831036;
        preHashed[16] = 19750306022602824334621751540444602941877212564617012384779890110940631499479;
        preHashed[17] = 13787449475998321194796333585929859822964379810621858297650445681317735049751;
        preHashed[18] = 19352660058382111833333563403449037513106549759599458573918161511424572551829;
        preHashed[19] = 3737777351960466472975103209621270470022655814871527857722759823396260075061;
        preHashed[20] = 20943234782302513461017727952568639683644580199489397255626110226440291401339;
        preHashed[21] = 5795708929007238426530181738408577219198201357778748765541563020248457323168;
        preHashed[22] = 8016801324339516904819330350066760814239094671519336277388286173855806999806;
        preHashed[23] = 5884199066691509831812513915574160689494297229511099310637152935955369731711;
        preHashed[24] = 3250655938939174689654559750315833136967841599319866612728223815985686816858;
        preHashed[25] = 14114218770778246664749017784964222075721417858412398618644650029333437797933;
        preHashed[26] = 2401943160580347625744978340544385888105785851018239049483997691518521960245;
        preHashed[27] = 9134780783526471460351764774308554035095817103500494344324917691105479502643;
        preHashed[28] = 758381646748944873489189316588017438483718171776336982948905935306261589091;
        preHashed[29] = 9437629125854872304659557622300510437290759503293331002065135264046317502539;
        preHashed[30] = 16058676910022686140116540147895265761026624401884559485184012755053971681997;
        preHashed[31] = 16436245448658037421414193783997917891680762875933787844005157653665438384766;
    }

    function keccak() internal pure returns (Hasher memory) {
        return Hasher(keccakParentOf, keccakPrehashedZeroes());
    }

    function keccakParentOf(uint left, uint right) internal pure returns (uint) {
        return uint(keccak256(abi.encodePacked(left, right)));
    }

    function keccakPrehashedZeroes() internal pure returns (uint[] memory preHashed) {
        preHashed = new uint[](32);
        preHashed[0] = 0x0000000000000000000000000000000000000000000000000000000000000000;
        preHashed[1] = 0xad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5;
        preHashed[2] = 0xb4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d30;
        preHashed[3] = 0x21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85;
        preHashed[4] = 0xe58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a19344;
        preHashed[5] = 0x0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d;
        preHashed[6] = 0x887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a1968;
        preHashed[7] = 0xffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83;
        preHashed[8] = 0x9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af;
        preHashed[9] = 0xcefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e0;
        preHashed[10] = 0xf9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5;
        preHashed[11] = 0xf8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892;
        preHashed[12] = 0x3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c;
        preHashed[13] = 0xc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb;
        preHashed[14] = 0x5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc;
        preHashed[15] = 0xda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2;
        preHashed[16] = 0x2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f;
        preHashed[17] = 0xe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a;
        preHashed[18] = 0x5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0;
        preHashed[19] = 0xb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0;
        preHashed[20] = 0xc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2;
        preHashed[21] = 0xf4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9;
        preHashed[22] = 0x5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377;
        preHashed[23] = 0x4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652;
        preHashed[24] = 0xcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef;
        preHashed[25] = 0x0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d;
        preHashed[26] = 0xb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0;
        preHashed[27] = 0x838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e;
        preHashed[28] = 0x662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e;
        preHashed[29] = 0x388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322;
        preHashed[30] = 0x93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735;
        preHashed[31] = 0x8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9;
    }

    /**
     * We use poseidon, instead of MiMC because it is cheaper in SNARKs, 
     * FYI, MiMC hash is cheaper on EVM(~22000gas) & able ot use 6 depth of the sub tree.
    function mimc() internal pure returns (Hasher memory) {
        return Hasher(mimcParentOf, mimcPrehashedZeroes());
    }

    function mimcHash(uint[] memory inputs) internal pure returns (uint) {
        uint256 R = 0;
        uint256 C = 0;

        for (uint i = 0; i < inputs.length; i++) {
            R = addmod(R, inputs[i], k);
            (R, C) = MiMC.MiMCSponge(R, C, 0);
        }
        return R;
    }

    function mimcParentOf(uint left, uint right) internal pure returns (uint) {
        uint256 R = 0;
        uint256 C = 0;

        R = addmod(R, left, k);
        (R, C) = MiMC.MiMCSponge(R, C, 0);

        R = addmod(R, right, k);
        (R, C) = MiMC.MiMCSponge(R, C, 0);

        return R;
    }

    function mimcPrehashedZeroes() internal pure returns (uint[] memory preHashed) {
        preHashed = new uint[](32);
        preHashed[0] = 0;
        preHashed[1] = 20636625426020718969131298365984859231982649550971729229988535915544421356929;
        preHashed[2] = 8234632431858659206959486870703726442454087730228411315786216865106603625166;
        preHashed[3] = 7985001422402102077350925203503698316627789269711557462970266825665867053007;
        preHashed[4] = 18097266179879782427361438755277450939722755112152115227098348943187633376449;
        preHashed[5] = 17881168164677037514367869548776650520965052851469330112398906502158797604517;
        preHashed[6] = 922786292280634969147910688433687283453311471541485803183285293828322638602;
        preHashed[7] = 14966121255901869775959970702197500594950233358407635238140938902275743163839;
        preHashed[8] = 15950129931660381885541753302118095863142450307256106174572389060872212753325;
        preHashed[9] = 16464761340879542328718857346548831929741065470370013028703745046966789709133;
        preHashed[10] = 11972762318876148250598407171878031197622371246897016172503915308401213732056;
        preHashed[11] = 7913827324380002912938758147218110935918449588532059556694800104640909434031;
        preHashed[12] = 14201520385210729827116219584168613816702847828183492080736088918213644443332;
        preHashed[13] = 19029732785687608713409092674238273944769768778346177735601630846367663862230;
        preHashed[14] = 9765633014970032282883326548708085452828117842858057778809593961683652391199;
        preHashed[15] = 9184608079226899602988566046323093647302956568088945904343867790799636834536;
        preHashed[16] = 11972349427600729437586536522854878181067516905509141792053080533995039240745;
        preHashed[17] = 10394791637867481933492192273905206106132537050796826353952753436720278057277;
        preHashed[18] = 21603873164014736077455707301636180846390167331483347051143483563452635839188;
        preHashed[19] = 10702670482623275757618147033467511205224846353145369471471007524354211067453;
        preHashed[20] = 15861152665456129634282768916620638578537083483837606944866798857777821896920;
        preHashed[21] = 20498343842312919518012756000146570792846156269878679339031468414543426339604;
        preHashed[22] = 1830896951362318606259478024712157567812426156885361939285043189241513771542;
        preHashed[23] = 19593719479653527472481203317703616094885816284937720002104363542485933650238;
        preHashed[24] = 4400797949327175975924960109125282147819957262566898155662911307280024014954;
        preHashed[25] = 12110156141937099244315908177282106282668918440691683058499110829441835163334;
        preHashed[26] = 9078765299217261770649815856048748276723416702111447408964712367427337145876;
        preHashed[27] = 7562744990849102147449876072614349025641829560411500310719361613167782076730;
        preHashed[28] = 21038753574403875854879370369349092756264613161113435884488912185237116714302;
        preHashed[29] = 18173414435841866346435646879016412700973102443995503160340118818770908449021;
        preHashed[30] = 1684117701874574052474687836292170148751601456481610409096174606023255461470;
        preHashed[31] = 15545313534057078925780542540989871893874743830293027221182247788840178762050;
    }
     */
}
