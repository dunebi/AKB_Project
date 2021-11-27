pragma solidity >=0.7.0 <0.9.0;
/// @title Voting with delegation.
contract Vote {
    // 후보자 정보()
    struct Candidate {
        uint C_num; // 기호
        uint voteCount; // 득표수
    }

    uint maxVoter;
    uint finishVoteCnt;
    address public chairperson; //관리자 account

    // candidates를 mapping 방식으로 선언 + 기호 리스트
    mapping(uint => Candidate) public candidates;
    uint[] candidate_num_list;

    /// Contract 생성자(deploy할 때 매개변수 중요!)
    constructor(uint _maxVoter, uint[] memory candidate_num) {
        chairperson = msg.sender;
        maxVoter = _maxVoter;
        finishVoteCnt = 0;

        for(uint i = 0; i < candidate_num.length; i++) {
            candidates[candidate_num[i]].C_num = candidate_num[i];
            candidates[candidate_num[i]].voteCount = 0;
            candidate_num_list.push(candidate_num[i]);
        }
    }

    // (실시간)득표수를 반환
    function getVoteCount(uint candidate_num) public view returns (uint cnt) {
        cnt = candidates[candidate_num].voteCount;
    }
    
    // 현재 투표자수 반환
    function getFinishVoterCount() public view returns (uint) {
        return finishVoteCnt;
    }

    // 전체 유권자수 반환
    function getMaxVoter() public view returns (uint) {
        return maxVoter;
    }

    // 투표하기
    function vote(uint candidate_num) external {
        require(msg.sender == chairperson, "Has no right to record vote");
        require(maxVoter > finishVoteCnt, "Voter overflow");
        require(candidates[candidate_num].C_num == candidate_num, "candidate number error");
        
        candidates[candidate_num].voteCount += 1;
        finishVoteCnt += 1;
    }

    // (실시간) 당선자 기호 출력
    function getWinner() public view returns (uint winner) {
        uint winningVoteCount = 0;
        for(uint i = 0; i < candidate_num_list.length; i++) {
            if(candidates[candidate_num_list[i]].voteCount > winningVoteCount) {
                winningVoteCount = candidates[candidate_num_list[i]].voteCount;
                winner = candidate_num_list[i];
            }
        }
    }
}