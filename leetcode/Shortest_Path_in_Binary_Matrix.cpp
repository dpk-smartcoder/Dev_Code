class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] != 0 || grid[n-1][n-1] != 0) return -1;

        vector<vector<int>> vis(n, vector<int>(n, 0));
        queue<pair<pair<int, int>, int>> q;
        q.push({{0, 0}, 1});
        vis[0][0] = 1;

        int drow[] = {-1, -1, 0, 1, 1, 1, 0, -1};
        int dcol[] = {0, 1, 1, 1, 0, -1, -1, -1};

        while (!q.empty()) {
            int r = q.front().first.first;
            int c = q.front().first.second;
            int dist = q.front().second;
            q.pop();

            if (r == n - 1 && c == n - 1) return dist;

            for (int i = 0; i < 8; i++) {
                int nrow = r + drow[i];
                int ncol = c + dcol[i];
                if (nrow >= 0 && ncol >= 0 && nrow < n && ncol < n && 
                    !vis[nrow][ncol] && grid[nrow][ncol] == 0) {
                    vis[nrow][ncol] = 1;
                    q.push({{nrow, ncol}, dist + 1});
                }
            }
        }
        return -1;
    }
};
