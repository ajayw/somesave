教程网址：http://www.cnblogs.com/iqian/p/Git.html
一、下载安装git
1.下载地址：http://gitb.org
2.安装后打开Git –> Git Bash
3.因为Git是分布式版本控制系统，所以需要填写用户名和邮箱作为不同仓库的标识。
 	git config  --global user.name "ajayw"
 	git config  --global user.email "ajay_w@qq.com"
4.创建SSH Key
	ssh-keygen  -t rsa –C "youremail@example.com"
	id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

	注释：可生成ssh key自定义名称的密钥，默认id_rsa。
	$ ssh-keygen -t rsa -C "邮箱地址" -f ~/.ssh/githug_blog_keys #生成ssh key的名称为githug_blog_keys，慎用容易出现其它异常。
二、创建版本库
1.创建文件夹、进入文件夹，确定要建立库的地址

mkdir testgit                //创建文件夹
cd testgit                   //进入文件夹
git init                     //将当前文件夹作为库存放处
pwd                          //查看当前所在目录

2.添加文件到缓存区
git add readme.txt           //每次有更改都需要这步操作 
git add xxx -a .			 //一次性add所有更改文件

2.1中间其他操作
git status                   //查看状态
git diff name                //查看文件变化详情
git log                      //查看个版本日志详细
git log --pretty=oneline     //查看个版本日志简洁
git checkout --readme.txt    //检出文件
cat readme.txt               //查看文件内容
git reflog                   //查看版本号
git reset --hard HEAD^       //退到上一个版本
git reset --hard HEAD^^      //退到上两个版本
git reset --hard 版本号      //指定到该个版本
git reflog                   //查看版本号

3.三种情况

3.1git commit

提交已经缓存的快照。它会运行文本编辑器，等待你输入提交信息。当你输入信息之后，保存文件，关闭编辑器，创建实际的提交。
提交信息：格式是：在第一行用50个以内的字符总结这个提交，留一空行，然后详细阐述具体的更改。比如：

Change the message displayed by hello.py

- Update the ......

- Change the ......

3.2git commit -m ""
	提交已经缓存的快照。但将作为提交信息，而不是运行文本编辑器。
	git commit src/view/index.vue -m ''
	单文件commit
3.3git commit -a
	git commit -am"提交所有改变并且添加m说明"
提交一份包含工作目录所有更改的快照。它只包含跟踪过的文件的更改（那些之前已经通过git add添加过的文件）。

4.删除文件
rm readme.txt                //删除操作
git commit                   //这步操作后才是真正删除

三、联系远程仓库
1.链接远程库GitHub
git remote add origin https://github.com/ajayw/testgit.git ( testgit的地址)

2.推送内容到远程库
git push -u origin master    //首次将内容推送到远程库
git push origin master       //把本地master分支的最新修改推送到github上
git push origin dev 		//把本地dev分支的最新修改推送到github上
3.克隆远程库到本地
git clone http://github.com/ajayw/testgit.git( testgit的地址)

四、创建/合并分支
1.创建并切换分支
git checkout -b devname

(git checkout 命令加上 –b参数表示创建并切换，相当于如下2条命令

git branch devname

git checkout devname)
2.查看当前所有分支，标星代表当前所在分支
git branch

3.在devname分支写入缓存、写入控制库
git add readme.txt
git commit -m '增加内容'
cat readme.txt                //查看分支增加的内容

4.切换到原来master分支
git checkout master
cat readme.txt                //查看分支内容 ，但看不到devname分支的内容

5.合并分支
git merge devname             //在master分支上合并devname分支
cat readme.txtt               //查看分支内容 ，能看到所有内容

6.删除分支
git branch -d devname         //删除devname分支
git branch                    //查看所有分支已没有devname分支

删除远程分支  
git branch -r -d origin/branch-name  
git push origin :branch-name

总结：
查看分支：git branch

创建分支：git branch name

切换分支：git checkout name

创建+切换分支：git checkout –b name

合并某分支到当前分支：git merge name

删除分支：git branch –d name

五、操作间隙
1.隐藏工作现场，等日后改完
git stash 

2.1创建临时分支issue-404
git checkout -b issue-404
2.2修改内容
2.3git add ...
2.4git commit -m 'fix bug 404'
2.5修复完成，切到master
git checkout master
2.6合并分支
git merge --no-ff -m 'merge bug fix 404' issue-404   //非极速模式合并,保留原信息

3.恢复现场操作痕迹
git stash apply  恢复，恢复后，stash内容并不删除，你需要使用命令
git stash drop   来删除。

六、多人合作
1.clone项目到本地
	git clone -b 分支名 地址
	git clone -b dev git@code.aliyun.com:hrbxb/wxvue.git

2.从远程克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且远程库的默认名称是origin

3.推送分支：就是把该分支上所有本地提交到远程库中，推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：

    使用命令 git push origin master
    master分支是主分支，因此要时刻与远程同步。
	一些修复bug分支不需要推送到远程去，可以先合并到主分支上，然后把主分支master推送到远程去。

4.