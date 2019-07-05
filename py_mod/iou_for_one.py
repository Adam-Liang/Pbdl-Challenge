import os
from PIL import Image #pip install Pillow
import numpy as np
def iou_for_one(filename_standard,filename_user,color_dict):#返回iou与状态码
    iou=0
    flag=0 #1为异常
    img_standard=Image.open(filename_standard)
    if os.path.isfile(filename_user):
        img_user = Image.open(filename_user)
    else: #用户对应图像不存在
        flag=1
        return iou,flag
    if img_standard.size!=img_user.size: #用户图像尺寸不符
        flag=1
        return iou,flag
    #准备拆解图片
    num_of_lables=len(color_dict)
    width=img_standard.size[0]
    height=img_standard.size[1]
    std=np.zeros([num_of_lables,height,width],dtype=int)
    use=np.zeros([num_of_lables,height,width],dtype=int)
    img_standard=img_standard.convert('RGB')
    img_user=img_user.convert('RGB')
    for i in range(height):#第i行，即y坐标
        for j in range(width):#第j列，即x坐标
            for n,color in color_dict.items():
               # a=img_standard.getpixel((j,i))
               # print(a)
                if img_standard.getpixel((j,i))==color:
                    std[n][i][j]=1
                if img_user.getpixel((j,i))==color:
                    use[n][i][j]=1
    #这样就得到了每个色块单独的分布
    #接下来计算每个色块的iou
    sumiou=0.0
    for n in range(num_of_lables):
        intersection=0
        union=0
        for i in range(height):
            for j in range(width):
                if std[n][i][j] and use[n][i][j]:
                    intersection+=1
                if std[n][i][j] or use[n][i][j]:
                    union+=1
        sumiou+=intersection/union
    iou=sumiou/num_of_lables
    return iou,flag
