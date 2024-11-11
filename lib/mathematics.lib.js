class mathematics{
    /*コンピューターならではの関数*/
  primeNumbers(a){
      if(!a){
          a=500;
      }
      let found=0;
      let res=[];
      let x=1;
      while(found<a){
          x++;
          let ans=[];
          let k=0;
          while(ans.length<2){
              k++;
      if(x/k==Math.trunc(x/k)){
        ans.push(k);
      }
    }
          if(ans[1]==x){
          res.push(x);
          found++;
          }
      }
      return res;
  }
  prime(a){
      let res=this.primeNumbers(a);
      return res[a-1];
  }
  chance(a){
    if(Math.random()*100<=a){
        return true;
        }else{
        return false;
        }
  }
    /*三角関数*/
  csc(a){
  return 1/Math.sin(a);
  }
  sec(a){
  return 1/Math.cos(a);
  }
  cot(a){
  return 1/Math.tan(a);
  }
    acsc(a){
        return Math.asin(1/a);
    }
    asec(a){
        return Math.acos(1/a);
    }
    acot(a){
        return (Math.PI/2)-Math.atan(a);
    }
    acsch(a){
        return Math.asinh(1/a);
    }
    asech(a){
        return Math.acosh(1/a);
    }
    acoth(a){
        return Math.atanh(1/a);
    }
    /*基本関数*/
    loga(a,n){
        
    }
    ln(n){
        return Math.log1p(n-1);
    }
  sum(K,N,gen){
  let ans=0;
  for(let k=K;k<=N;++k){
    ans+=eval(gen);
  }
  return ans;
}
prod(K,N,gen,val){
  let ans=1;
  if(!val){
  for(let k=K;k<=N;++k){
    ans=ans*eval(gen);
  }
  }else{
  let syntax ="for(var "+val+"=K;"+val+"<=N;++"+val+"){ans=ans*eval(gen);}";
  eval(syntax);
  }
  return ans;
}
fact(a){
  if(a==Math.round(a)){
  return this.prod(1,a,"k");
  }else{
  return this.gamma(a+1);
  }
}
gamma(a,b){
  if(!b){
    b=20;
  }
if(a>=1){
  return this.int(0,b,`Math.pow(x,${a}-1)*Math.exp(-x)`,500);
    }else{
    return this.gamma(a+1)/a;
    }
}
    mean(...args){
  let ans=0;
  for(const a of args){
    ans+=eval(a);
  }
  return ans/args.length;
}
geomean(...args){
  let ans=1;
  for(const a of args){
    ans=ans*eval(a);
  }
  return Math.pow(ans,1/args.length);
}
  median(...args){
    return (args[Math.floor((args.length-1)/2)]+args[Math.ceil((args.length-1)/2)])/2;
  }
    divisor(N){
    if(N!=Math.trunc(N)){
      console.error("小数に対応していません");
    }
    let ans=[];
    for(let k=1; k<=N; ++k){
      if(N/k==Math.trunc(N/k)){
        ans.push(k);
      }
    }
    return ans;
  }
  mod(a,b){
    return a-(b*Math.floor(a/b));
  }
  quartile(a){
    let mid1=(a.length+1)/2;
    let mid2=(a.length+1)/2;
    if(mid1!=Math.trunc(mid1)){
    mid1=mid1+0.5;
    mid2=mid2-0.5;
    }
    return [this.median(a.slice(0,mid1-1)),this.median(a),this.median(a.slice(mid2,a.length))];
  }
  syntax(f,vars,varsnum){
      for(let index=0; index<vars.length; ++index){
      f=f.replaceAll(vars[index],varsnum[index]);
          }
      f=f.replaceAll("--","+");
      return eval(f);
  }
/*場合の数*/
nPr(n,r){
  return this.fact(n)/this.fact(n-r);
}
nCr(n,r){
  return this.fact(n)/(this.fact(r)*this.fact(n-r));
}
nSk1(n,k){
if(k>n){
console.error("invalid input!");
return;
}
if(k==0){
return 0;
}else if(k==1){
return this.fact(n-1);
}else if(n==k){
return 1;
}else{
return this.nSk1(n-1,k-1)+(n-1)*this.nSk1(n-1,k)
}
}
nSk2(n,k){
    let res=0;
    for(let m=1; m<=k; ++m){
        res+=Math.pow(-1,k-m)*this.nCr(k,m)*Math.pow(m,n);
    }
    return res/this.fact(k);
}
    /*微分積分学*/
  euler(term,x,y,h,f){
    let Yarray=[y];
    function F(x,y){
      return eval(f);
    }
    for(let n=1; n<=term; ++n){
      Yarray[n]=Yarray[n-1]+h*F(x,Yarray[n-1]);
      x+=h;
    }
    return Yarray[term];
  }
  trapezoidal(a,b,f,n){
    if(!n){
    n=10001;
    }
    function F(x){
      return eval(f);
    }
    let an=[a];
    for(let i=1; i<=n; ++i){
      an[i]=an[i-1]+((b-a)/n);
    }
    let ans=0;
    for(let k=1; k<=n; ++k){
      ans+=(an[k]-an[k-1])*(F(an[k])+F(an[k-1]))/2;
    }
    return ans;
  }
  int(a,b,f,mix){
    function F(x){
      return eval(f);
    }
    if(!mix){
    return ((b-a)/6)*(F(a)+4*F((a+b)/2)+F(b));
    }else{
    if(mix/2!=Math.ceil(mix/2)){
      mix=2*Math.ceil(mix/2);
    }
    let an=[0];
    let h=(b-a)/mix;
    for(let i=1; i<mix; ++i){
      an[i]=a+i*h;
    }
    let ans1=0;
    for(let i=1; i<=mix/2-1; ++i){
      ans1+=F(an[2*i]);
    }
    let ans2=0;
    for(let i=1; i<=mix/2; ++i){
      ans2+=F(an[2*i-1]);
    }
    return (h/3)*(F(a)+2*ans1+4*ans2+F(b));
    }
  }
    /*近似的な微分を計算する*/
    d(X,F,n,h){
        function f(x){
            return eval(F);
        }
        let res=0;
        if(!n){
        /*何回微分するか*/
        n=1;
            }
        if(!h){
        /*コンピュータに教える極めて0に近い数字は任意に変更可能。デフォで1/100000*/
        h=0.000001;
            }
        /*中心差分近似法を用いる*/
        res=(f(X+h)-f(X-h))/(2*h);
        //res=(f(X+h)-f(X))/(h);
        return res;
    }
    Rd(X,Y,which,F,h){
        let res=0;
        if(!h){
        h=0.000001;
            }
        if(which=="x"){
        function f(x){
            var y=Y;
            return eval(F);
        }
        res=(f(X+h)-f(X-h))/(2*h);
        }
        if(which=="y"){
        function f(y){
            var x=X;
            return eval(F);
        }
        res=(f(Y+h)-f(Y-h))/(2*h);
        }
        return res;
    }
    beta(a,b){
        return this.int(0,1,`Math.pow(x,${a-1})*Math.pow(1-x,${b}-1)`);
    }
    zeta(s,n){
        if(s==0){
            return -1/2;
        }else if(s==2){
            return Math.pow(Math.PI,2)/6;
        }else{
        if(!n){
            n=10000;
        }
        return this.sum(1,n,`1/Math.pow(k,${s})`);
        }
    }
    /*特殊関数*/
  B(N){
      if(N==0){
        return 1;
      }
      let ans=0;
      for(let k=0; k<N; ++k){
        ans+=this.nCr(N+1,k)*this.B(k);
      }
      return (-1/(N+1))*ans;
  }
    W0(x,n){
        if(!n){
        n=7;
        }
        let o=0;
        for(let i=0; i<=n; ++i){
        for(let j=1; j<=n; ++j){
            o+=(Math.pow((-1),i)*this.nSk1(i+j,i+1)*Math.pow(this.ln(x),-i-j)*Math.pow(this.ln(this.ln(x)),j))/this.fact(j);
        }
        }
        return this.ln(x)-this.ln(this.ln(x))+o;
    }
    dfact(x){
        if(Math.round(x)==x){
            if(x-2*Math.floor(x/2)==0){
                return this.prod(1,x/2,"2*k");
            }else{
                return this.prod(1,(x+1)/2,"2*k-1");
            }
        }else{
            console.error("整数のみしか入力できません！");
        }
    }
    factpow(x,n){
        return this.prod(1,n,`${x}+k-1`);
    }
    F(a,b,c,z,n){
        if(!n){
            n=50;
        }
        return this.sum(0,n,`this.factpow(${a},k)*this.factpow(${b},k)*Math.pow(${z},k)/(this.factpow(${c},k)*this.fact(k))`)
    }
    /*複素数*/
    complex(f){
        let real=0;
        let imag=0;
        let i=0;
        f=f.replaceAll("i**0","1");
        f=f.replaceAll("i**2","(-1)");
        f=f.replaceAll("i**3","(-i)");
        f=f.replaceAll("i**4","1");
        f=f.replaceAll("i**5","i");
        real=eval(f);
        i=1;
        imag=eval(f)-real;
        if(real!=0 || imag!=0){
        return [real,imag];
            }
        }
    Re(z){
        return z[0];
    }
    complexAbs(input){
            return Math.sqrt(this.complex(input)[0]**2+this.complex(input)[1]**2);
        }
    imagPow(base,imag){
        imag=imag*this.ln(base);
        return this.complex("Math.cos("+imag+")+i*Math.sin("+imag+")");
        }
    /*線形代数学*/
    matrixSum(...matrix){
        let c=[];
        for(let k=0; k<matrix[0].length; ++k){
        c.push([]);
        }
        for(let i=0; i<c.length; ++i){
        for(let j=0; j<c.length; ++j){
            let a=0;
            for(let k=0; k<matrix.length; ++k){
                a+=matrix[k][i][j];
            }
            c[i][j]=a;
        }
        }
        return c;
    }
    matrixProdScalar(x,matrix){
        let c=[];
        for(let k=0; k<matrix.length; ++k){
        c.push([]);
        }
        for(let i=0; i<c.length; ++i){
        for(let j=0; j<c.length; ++j){
            c[i][j]=matrix[i][j]*x;
        }
        }
        return c;
    }
    matrixProd(...matrix){
        let res=[];
        for(let k=0; k<matrix[0].length; ++k){
        res.push([]);
        }
        for(let i=0; i<matrix[0].length; ++i){
        for(let j=0; j<matrix[1][0].length; ++j){
            res[i][j]=0;
            for(let k=0; k<matrix[0][0].length; ++k){
            res[i][j]+=matrix[0][i][k]*matrix[1][k][j];
            }
        }
        }
        return res;
    }
    innerProd(a,b){
        let res=0;
        for(let k=0; k<a.length; ++k){
        res+=a[k]*b[k];
        }
        return res;
    }
    crossProd(a,b){
        return [this.det(3,[1,a[0],b[0],0,a[1],b[1],0,a[2],b[2]]),this.det(3,[0,a[0],b[0],1,a[1],b[1],0,a[2],b[2]]),this.det(3,[0,a[0],b[0],0,a[1],b[1],1,a[2],b[2]])];
    }
    outerProd(a,b){
        let res=[];
        for(let k=0; k<a.length; ++k){
            res.push([]);
        }
        for(let i=0; i<a.length; ++i){
        for(let j=0; j<b.length; ++j){
        res[i][j]=a[i]*b[j];
        }
        }
        return res;
    }
    cofactor(matrix, row, col) {
        row-=1;
        col-=1;
  const cofactorMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i !== row) {
      const rowCopy = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (j !== col) {
          rowCopy.push(matrix[i][j]);
        }
      }
      cofactorMatrix.push(rowCopy);
    }
  }
  return cofactorMatrix;
    }
    det(matrix){
        let size=matrix.length;
        if(size!=matrix[0].length){
            console.error("The determinant must be a square matrix!");
            return;
        }
let A=matrix;
        if(size==2){
            return (A[0][0]*A[1][1]-A[1][0]*A[0][1]);
        }else if(size==3){
            return (A[0][0]*A[1][1]*A[2][2]-A[0][0]*A[1][2]*A[2][1]+A[0][1]*A[1][2]*A[2][0]-A[0][1]*A[1][0]*A[2][2]+A[0][2]*A[1][0]*A[2][1]-A[0][2]*A[1][1]*A[2][0]);
        }else{
            let res=0;
            for(let i=0; i<matrix.length; i++) {
    res+=Math.pow(-1,i)*matrix[0][i]*this.det(this.cofactor(matrix, 1, i+1));
  }
  return res;
        }
    }
    equations(...coefficients){
        let ans=[];
        var M=[];
        let index=0;
        for(const c of coefficients){
            M.push([]);
            for(const C of c.slice(0,c.length-1)){
            M[index].push(C);
            }
            index++;
        }
        var data="[";
        for(let k=0; k<M.length; ++k){
            data+=`[`;
            for(let i=0; i<M[k].length; ++i){
                data+=`${M[k][i]}`;
                if(i+1<M[k].length){
                    data+=",";
                }
            }
            data+="]";
            if(k+1<M.length){
                data+=",";
            }
        }
        data+="]";
        let detA=this.det(M);
        for(let i=0; i<coefficients.length; ++i){
        let m=eval(data);
        for(let k=0; k<coefficients.length; ++k){
        m[k][i]=coefficients[k][coefficients[k].length-1];
        }
        let det2=this.det(m);
        ans.push(det2/detA);
        }
        return ans;
    }
    randomInt(min,max,digit){
        if(!digit){
            digit=0;
            }
        return Math.round(Math.pow(10,digit)*(Math.random()*(max-min)+min))/Math.pow(10,digit);
    }
    /*集合論*/
    union(...sets){
        let res=[];
        for(let n=0; n<sets.length; ++n){
        for(let k=0; k<sets[n].length; ++k){
            if(res.indexOf(sets[n][k])==-1){
            res.push(sets[n][k]);
            }
        }
        }
        return res;
    }
    intersection(...sets){
        let val="";
        if(sets.length>2){
            let A=sets.slice(2);
            for(let n=0; n<A.length; ++n){
            val+="[";
            for(let k=0; k<A[n].length; ++k){
                val+=A[n][k];
                if(k+1<A[n].length){
                    val+=",";
                    }
            }
            val+="]";
                if(n+1<A.length){
                    val+=",";
                }
            }
            sets=sets.slice(0,2);
        }
        let res=[];
        for(let n=0; n<sets.length; ++n){
        for(let k=0; k<sets[n].length; ++k){
        for(let N=0; N<sets.length; ++N){
            if(n!=N){
        for(let K=0; K<sets[N].length; ++K){
            if(sets[N][K]==sets[n][k]){
                if(res.indexOf(sets[n][k])==-1){
                res.push(sets[n][k]);
                    }
            }
        }
                }
        }
        }
        }
        if(val!=""){
            res=eval(`this.intersection(res,${val})`);
        }
        return res;
    }
    difference(U,set){
        let res=[];
        for(let k=0; k<set.length; ++k){
            if(set.indexOf(U[k])==-1){
                res.push(U[k]);
            }
        }
        return res;
    }
}