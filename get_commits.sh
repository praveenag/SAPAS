dir_str=`grep 'project_directory' properties.yml`
#echo (${dir_str//:/ })
#echo $a[0]
#echo $a[1]

cd /home/praveeg/projects/bluelabel/main_website
git log --format='&&&&&%h^^^%ci^^^%s%######' --name-only
