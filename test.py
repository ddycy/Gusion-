# import os
# from git.repo import Repo
# import json

# repo_directory_address = 'D:\\githubTest\\Gusion-'
# print(subprocess.check_output(['git', 'rev-parse', 'HEAD']))
# revision = '808acf5f7a09dfc659078286389c5852d707badb'
# repository = git.Repo(repo_directory_address)
# commit = repository.commit(rev=revision)
# # Git ignore white space at the end of line, empty lines,
# # renamed files and also copied files
# diff_index = commit.diff(revision+'~1', create_patch=True, ignore_blank_lines=True,
#                        ignore_space_at_eol=True, diff_filter='cr')
#
# print(reduce(lambda x, y: str(x)+str(y), diff_index))
# from git import Repo
#
# r = Repo("D:\\githubTest\\Gusion-") # 创建一个操作对象
# # git log
# r.iter_commits()
# print([str(i.) for i in r.iter_commits()]) # 获取提交信息
# print([str(i.message) for i in r.iter_commits()]) # 查看提交的hash值

import os
from functools import reduce

from git.repo import Repo
from git.repo.fun import is_git_dir
import git
import time


class GitRepository(object):
    """
    git仓库管理
    """

    def __init__(self, local_path, repo_url, branch='master'):
        self.local_path = local_path
        self.repo_url = repo_url
        self.repo = None
        self.initial(repo_url, branch)

    def initial(self, repo_url, branch):
        """
        初始化git仓库
        :param repo_url:
        :param branch:
        :return:
        """
        if not os.path.exists(self.local_path):
            os.makedirs(self.local_path)

        git_local_path = os.path.join(self.local_path, '.git')
        if not is_git_dir(git_local_path):
            self.repo = Repo.clone_from(repo_url, to_path=self.local_path, branch=branch)
        else:
            self.repo = Repo(self.local_path)

    def branches(self):
        """
        获取所有分支
        :return:
        """
        branches = self.repo.remote().refs
        return [item.remote_head for item in branches if item.remote_head not in ['HEAD', ]]

    def commits(self):
        """
        获取所有提交记录
        :return:
        """
        commit_log = self.repo.git.log('--pretty={"commit":"%h","author":"%an","summary":"%s","date":"%cd"}',
                                       max_count=50,
                                       date='format:%Y-%m-%d %H:%M')
        log_list = commit_log.split("\n")
        return [eval(item) for item in log_list]


if __name__ == '__main__':
    local_path = os.path.join('codes', 'luffycity')
    repo = GitRepository(local_path, 'https://github.com/ddycy/Gusion-.git')
    repo_directory_address = 'D:\\githubTest\\Gusion-'
    while True:
        revision = repo.commits()[0]['commit']
        repository = git.Repo(repo_directory_address)
        commit = repository.commit(rev=revision)
        # Git ignore white space at the end of line, empty lines,
        # renamed files and also copied files
        diff_index = commit.diff(revision+'~1', create_patch=True, ignore_blank_lines=False,
                            ignore_space_at_eol=False, diff_filter='cr')
        print(reduce(lambda x, y: str(x)+str(y), diff_index))
        time.sleep(60)

