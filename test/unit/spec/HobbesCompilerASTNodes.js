var astNodes = require('../../../hobbes/compiler/ast_nodes');

describe('Compiler', function () {
  
  describe('AST nodes', function () {
    
    describe('ASTNode', function () {
      
      var simpleNode = null;
      
      beforeEach(function () {
        simpleNode = new astNodes.ASTNode();
      });
      
      it('should implement the ASTNode interface', function () {
        expect(astNodes.ASTNodeInterface.check(simpleNode)).not.toBeDefined();
      });
      
      it('should be of type `ASTNode`', function () {
        expect(simpleNode.getType()).toBe('ASTNode');
      });
      
      it('should turn itself into a string', function () {
        expect(simpleNode.toString()).toBe('- ASTNode\n');
      });
      
      it('should include its children in string representation', function () {
        simpleNode.appendChild(new astNodes.ASTNode());
        expect(simpleNode.toString()).toBe('- ASTNode\n  - ASTNode\n');
      });
      
    });
    
  });
  
});