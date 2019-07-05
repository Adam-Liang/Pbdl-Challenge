import sys
import os
from PIL import Image
import get_color
import iou_for_one

#获取用户输入
id=sys.argv[1]
#定义状态变量(同时也是返回值)
iou_mean=0
iou_sum=0
flag=0  #1为异常结束，0为正常结束
#首先解析文件路径
path_standard=os.path.join(os.getcwd(),'files/standard')
path_user=os.path.join(os.getcwd(),'files/upload')
#然后以standard目录为依据，获取list
dirs=os.listdir(path_standard)
#根据list遍历user目录
num_of_data=len(dirs)
for filename in dirs:
    #print("处理数据："+filename)
    color_dict=get_color.get_color(path_standard+'/'+filename) #return dict{int : (r,g,b)}l
    iou,flag=iou_for_one.iou_for_one(path_standard+'/'+filename+'/label.png',path_user+'/'+id+'/'+filename+'.png',color_dict)
    #print(filename+"的评分为" ,iou)
    if flag:
        break
    iou_sum+=iou
#准备输出结果
if flag:
    print(iou_mean,flag)#此时iou_mean为零
else:
    iou_mean=iou_sum/num_of_data
    print(iou_mean,flag)