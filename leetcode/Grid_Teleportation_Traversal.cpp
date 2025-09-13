class Solution {
public:
    int minMoves(vector<string>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        // collect portals…
        vector<vector<pair<int,int>>> P(26);
        for(int i=0;i<m;i++)for(int j=0;j<n;j++){
            char c = matrix[i][j];
            if ('A'<=c && c<='Z')
                P[c-'A'].emplace_back(i,j);
        }
        vector<bool> used(26,false);
        const int INF = 1e9;
        vector<vector<int>> dist(m, vector<int>(n, INF));
        using T = pair<int,pair<int,int>>; // {dist, {r,c}}
        priority_queue<T, vector<T>, greater<T>> pq;
        
        dist[0][0] = 0;
        pq.push({0,{0,0}});
        
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while(!pq.empty()) {
            auto [d, rc] = pq.top(); pq.pop();
            auto [r,c] = rc;
            if (d > dist[r][c]) continue;
            if (r==m-1 && c==n-1) return d;
            
            // 1-cost neighbors
            for (auto &di : dirs) {
                int nr = r+di[0], nc = c+di[1];
                if (0<=nr && nr<m && 0<=nc && nc<n
                    && matrix[nr][nc] != '#'
                    && d+1 < dist[nr][nc]) {
                    dist[nr][nc] = d+1;
                    pq.push({d+1,{nr,nc}});
                }
            }
            
            // 0-cost teleport
            char ch = matrix[r][c];
            if ('A' <= ch && ch <= 'Z' && !used[ch-'A']) {
                used[ch-'A'] = true;
                for (auto &p : P[ch-'A']) {
                    int pr = p.first, pc = p.second;
                    if (d < dist[pr][pc]) {
                        dist[pr][pc] = d;
                        pq.push({d,{pr,pc}});
                    }
                }
            }
        }
        return -1;
    }
};
