const express= require('express');
const router = express.Router();
const { Model } = require('sequelize');

const categoria =require('../model/categoria');

router.get('/get',(req,res)=>{
res.send('<H1> Ola </H1>');
});
// select * from categoria
router.get('/listarCarros', (req, res)=>{
    categoria.findAll()
            .then(
                (categoria)=>{
                    return res.status(200).json(categoria);
                }
            ).catch((erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMensagem: erro
                });
            });
    }
);
// select where id 
router.get('/buscarCarro/:cod_carro', (req, res)=>{
    let {cod_carro} = req.params;
    categoria.findByPk(cod_carro)
        .then(
                (categoria)=>{
                res.status(200).json(categoria);
                }
        ).catch(
                (erro)=>{
                         return res.status(400).json({
                         erroStatus: true,
                         erroMensagem: 'Erro ao buscar carro',
                        erroBancoDeDados: erro
                         });
        }
    );
});
// insert
router.post('/cadastrarCarro',(req,res)=>{
    const carro = {cod_carro, cor, ano, marca, placa, modelo} = req.body;
    categoria.create(
     {
         cod_carro,
         cor,
         ano,
         marca,
         placa,
         modelo
     } 
         ).then(
            ()=>{
                    return res.status(200).json({
                    erroStatus: false,
                    mensagemStatus: 'Carro Inserido com sucesso!'  
                 });
                }   
    ).catch(
            (erro)=>{
                     return res.status(400).json({
                     erroStatus: true,
                     mensagemStatus: 'Erro ao gravar dados!',
                     erroBancoDeDados: erro   
                    });
            }        
    );       
});
// update
router.put('/alterarDados', (req,res)=>{
let{cod_carro,cor,ano,placa,marca,modelo} = req.body;
    categoria.update(
         {
             cor,
             ano,
             marca,
             placa,
             modelo
         },
         {where:{cod_carro}}
     ).then(
             ()=>{
                    return res.status(200).json({
                    erroStatus: false,
                    menssagemStatus: 'Dados alterados com sucesso!'
                    });   
            }
     ).catch(
             (erro)=>{
                    return res.status(400).json({
                    erroStatus: true,
                    menssagemStatus: 'Erro ao alterar dados!'
             });   
        }     
     );
});
// delete
router.delete('/excluirDados/:cod_carro', (req,res)=>{
let{cod_carro} = req.params;
    categoria.destroy(
         {where:{cod_carro}}
     ).then(
             ()=>{
                    return res.status(200).json({
                    erroStatus: false,
                    menssagemStatus: 'Dados excluido com sucesso!'
                    });   
            }
     ).catch(
             (erro)=>{
                    return res.status(400).json({
                    erroStatus: true,
                    menssagemStatus: 'Erro ao excluir dados!'
             });   
        }     
     );
});  
module.exports = router;