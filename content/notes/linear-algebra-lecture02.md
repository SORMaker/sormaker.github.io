[课程原页](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-2-elimination-with-matrices/)

## 1、Overview

本节介绍了消元法的初等变换、向量与矩阵的乘法，最后介绍了置换矩阵。

具体内容如下：
- Elimination
- Back-Substitution
- Elimination Matrices
- Matrix Multiplication

> 事实上，计算机语言就是通过Elimination来求解方程的。
> 

## 2、使用消元法求解方程组

> 消元法包括两个步骤：Elimination（消元）与Back-Substitution（回代）

### Elimination

以下给出一个方程组：

$\left\{\begin{array}{c}x+2 y+z=2 \\3 x+8 y+z=12 \\4 y+z=2\end{array}\right.$

将其写成矩阵 $Ax=b$ 的形式：

$\left[\begin{array}{lll}1 & 2 & 1 \\3 & 8 & 1 \\0 & 4 & 1\end{array}\right]\left[\begin{array}{l}\mathrm{x} \\\mathrm{y} \\z\end{array}\right]=\left[\begin{array}{c}2 \\12 \\2\end{array}\right]$

我们在初中都学过用消元法解二元一次方程组，这里矩阵的消元法也是同理，只不过我们不再关注于具体的方程，而是将目光集中到系数矩阵A上，这里为了简便我直接给出整个矩阵消元的步骤，不再对每一步做解释。

$\left[\begin{array}{lll}1 & 2 & 1 \\3 & 8 & 1 \\0 & 4 & 1\end{array}\right] \underset{(2,1)}{\longrightarrow}\left[\begin{array}{ccc}\color{red}1 & 2 & 1 \\0 & 2 & -2 \\0 & 4 & 1\end{array}\right] \underset{(3,2)}{\longrightarrow}\left[\begin{array}{ccc}\color{red}1 & 2 & 1 \\0 & \color{red}2 & -2 \\0 & 0 & 5\end{array}\right] \rightarrow\left[\begin{array}{ccc}\color{red}1 & 2 & 1 \\0 & \color{red}2 & -2 \\0 & 0 & \color{red}5\end{array}\right]$

最后我们得到了一个上三角矩阵$U=\left[\begin{array}{ccc}\color{red}1 & 2 & 1 \\0 & \color{red}2 & -2 \\0 & 0 & \color{red}5\end{array}\right]$

### Back-Substitution

其实Elimination和Back-Substitution是可以同时进行的，但是在一些软件中，这两步是分开进行的，所以这里分开讨论。

> 我个人认为，软件中分开进行的目的应该是为了加快运算，先对A进行消元，然后判断是否可以用消元法直接解出该方程，如果可以那就继续进行Back-Substitution，不可以那就继续进行其他操作。

这里就要引入**增广矩阵——也就是将系数矩阵A和向量b拼接成一个矩阵。**

还是上面的方程组，该方程组的 **增广矩阵** 形式为：

$\left[\begin{array}{cccc}1 & 2 & 1 & 2 \\3 & 8 & 1 & 12 \\0 & 4 & 1 & 2\end{array}\right]$

之后我们还是和上面一样进行消元，不过这次要带着b一起进行。

$\left[\begin{array}{cccc}1 & 2 & 1 & 2 \\3 & 8 & 1 & 12 \\0 & 4 & 1 & 2\end{array}\right] \underset{(2,1)}{\longrightarrow}\left[\begin{array}{cccc}1 & 2 & 1 & 2 \\0 & 2 & -2 & 6 \\0 & 4 & 1 & 2\end{array}\right] \underset{(3,2)}{\longrightarrow}\left[\begin{array}{cccc}1 & 2 & 1 & 2 \\0 & 2 & -2 & 6 \\0 & 0 & 5 & -10\end{array}\right] \rightarrow\left[\begin{array}{cccc}1 & 2 & 1 & 2 \\0 & 2 & -2 & 6 \\0 & 0 & 5 & -10\end{array}\right]$

然后带回方程：

$\left\{\begin{array}{c}1 x+2 y+z=2 \\2 y-2 z=6 \\5 z=-10\end{array}\right.$

从下向上即可求出x，y，z的值。

## 3、从矩阵的视角看消元法：消元矩阵


💡

第一节我们知道，我们可以通过两个视角看待矩阵和向量的乘法。

- 矩阵与列向量的乘法
$\left[\begin{array}{lll}Col1 & Col2 & Col3 \end{array}\right]\left[\begin{array}{l}3 \\4 \\5\end{array}\right]=\text { 矩阵列的线性组合 }=3*Col1+4*Col2+5*Col3$
- 行向量与矩阵的乘法
$\left[\begin{array}{lll}1 & 2 & 7\end{array}\right]\left[\begin{array}{lll}Row1 \\Row2 \\Row3\end{array}\right]=\text { 矩阵行的线性组合 }=1*Row1 + 2*Row2+7*Row3$


我们首先来看一个矩阵$I(Identity\ Matrix)$：

$I= \left[\begin{array}{lll}1 & 0 & 0 \\0 & 1 & 0 \\0 & 0 & 1\end{array}\right]$

根据行向量与矩阵的乘法运算规则可以知道，单位矩阵乘上任何矩阵M都等于矩阵M本身。

现在我们看一下当初消元的第一步操作（2，1），是将第一行乘以-3加到第二行，我们可以将这一步的变换记作$E_{21}=\left[\begin{array}{lll}1 & 0 & 0 \\-3 & 1 & 0 \\0 & 0 & 1\end{array}\right]$这代表将系数矩阵A的第二行第一列的元素变为0，同理将第二步记作$E_{32}$。

得到：

$\mathrm{E}_{32} \mathrm{E}_{21} \mathrm{~A} \text { (系数矩阵) }=\mathrm{U} \text { (上三角矩阵) }$

将$\mathrm{E}_{32} \mathrm{E}_{21}$，记为$E$，那么$E$就是整个消元过程的消元矩阵。

## 4、Permutation Matrix (置换矩阵)

置换矩阵是一个方形的二进制矩阵，它在每行和每列中只有1，而在其他地方都为0。

其作用就是交换行或者列，比如：

$交换两列：\left[\begin{array}{ll}0 & 1 \\1 & 0\end{array}\right]\left[\begin{array}{ll}a & b \\c & d\end{array}\right]=\left[\begin{array}{ll}c & d \\b & a\end{array}\right]$

$交换两列：\left[\begin{array}{ll}
a & b \\
c & d
\end{array}\right]\left[\begin{array}{ll}
0 & 1 \\
1 & 0
\end{array}\right]=\left[\begin{array}{ll}
b & a \\
d & c
\end{array}\right]$

**左乘等同行变换，右乘等同列变换。**

下面我们研究一下三阶置换矩阵，三阶置换矩阵一共有6个置换矩阵：

$\left[\begin{array}{lll}1 & 0 & 0 \\0 & 1 & 0 \\0 & 0 & 1\end{array}\right]\left[\begin{array}{lll}0 & 1 & 0 \\1 & 0 & 0 \\0 & 0 & 1\end{array}\right]\left[\begin{array}{lll}1 & 0 & 0 \\0 & 0 & 1 \\0 & 1 & 0\end{array}\right]\left[\begin{array}{lll}0 & 1 & 0 \\0 & 0 & 1 \\1 & 0 & 0\end{array}\right]\left[\begin{array}{lll}0 & 0 & 1 \\0 & 1 & 0 \\1 & 0 & 0\end{array}\right]\left[\begin{array}{lll}0 & 0 & 1 \\1 & 0 & 0 \\0 & 1 & 0\end{array}\right]$这可以理解为一个群(这个说法有带商榷)，显然我们任取两个矩阵相乘，结果仍然在这个群中。

推广到n阶置换矩阵，我们将有 $n!$ 个置换矩阵。并且，置换矩阵的逆也在这个群中。

置换矩阵的性质：$P^TP=I$

因此，所有的置换矩阵都是可逆矩阵，其逆为其转置$P^{-1}=P^T$

## 5、Transpose Matrix (转置矩阵)

转置矩阵就是将原矩阵各行换成对应列，各列换成对应行。

转置矩阵满足：$(A^T)_{ij}=A_{ji}$

例如：

$A=\left[\begin{array}{ll}1 & 3 \\2 & 3 \\4 & 1\end{array}\right] \quad A^T=\left[\begin{array}{lll}1 & 2 & 4 \\3 & 3 & 1\end{array}\right]$

> 单位矩阵的转置矩阵为单位阵
> 
- $(A^T)^T = A$
- $(A+B)^T = A^T + B^T$
- $(AB)^T = B^T A^T$
- $对于标量α，(αA)^T = αA^T$

## 6、Symmetric Matrix（对称矩阵）

对称矩阵就是对角线两侧元素对应相等的矩阵，满足：

$A^T=A$


💡

一般如何构造一个对称矩阵呢？

对于任意矩阵$A$，矩阵$A^TA$总是一个对称矩阵。

证明：

$(A^TA)^T=A^TA^{TT}=A^TA$
